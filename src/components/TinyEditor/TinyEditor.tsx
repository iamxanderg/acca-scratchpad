import { Editor } from '@tinymce/tinymce-react';
import { useRef } from 'react';
import { Editor as TinyMceEditor } from 'tinymce';
import { v4 as uuidv4 } from 'uuid';

type TinyEditorProps = {
  apiKey: string;
  id?: string;
  initialValue?: string;
  contentStyle?: string;
  height?: string;
  plugins: string[];
  toolbars: { [key: string]: string };
  width?: string;
  onEditorCallback: (editor: TinyMceEditor) => void;
};

export default function TinyEditor(props: TinyEditorProps) {
  const {
    apiKey,
    id = uuidv4(),
    initialValue = '',
    contentStyle = '',
    height = '100%',
    width = '100%',
    plugins,
    toolbars,
    onEditorCallback,
  } = props;
  const editorRef = useRef(null);
  const currentSkin = 'acca';

  const setupEditor = (editor: any) => {
    editor.on('focus', () => {
      onEditorCallback(editor);
    });

    editor.ui.registry.addButton('reset', {
      icon: 'document-properties',
      tooltip: 'Reset Document',
      items: 'newdocument',
      onAction: () => {
        if (window.confirm('Are you sure you want to reset the document?')) {
          editor.resetContent('');
        }
      },
    });

    editor.ui.registry.addButton('mycut', {
      text: 'Cut',
      icon: 'cut',
      tooltip: 'Cut',
      items: 'cut',
      onAction: () => {
        editor.execCommand('cut');
      },
    });

    editor.ui.registry.addButton('mycopy', {
      text: 'Copy',
      icon: 'copy',
      tooltip: 'Copy',
      items: 'copy',
      onAction: () => {
        editor.execCommand('copy');
      },
    });

    editor.ui.registry.addButton('mypaste', {
      text: 'Paste',
      icon: 'paste',
      tooltip: 'Paste',
      items: 'paste',
      onAction: async () => {
        editor.execCommand('paste');
      },
    });

    editor.ui.registry.addButton('myundo', {
      text: 'Undo',
      icon: 'undo',
      tooltip: 'Undo',
      items: 'undo',
      onAction: () => {
        editor.execCommand('undo');
      },
    });

    editor.ui.registry.addButton('myredo', {
      text: 'Redo',
      icon: 'redo',
      tooltip: 'Redo',
      items: 'redo',
      onAction: () => {
        editor.execCommand('redo');
      },
    });
  };

  return (
    <Editor
      apiKey={apiKey}
      id={id}
      initialValue={initialValue}
      ref={editorRef.current}
      init={{
        width: width,
        height: height,
        menubar: false,
        statusbar: false,
        resize: false,
        contextmenu: false,
        contextmenu_never_use_native: true,
        content_style: contentStyle,
        plugins: plugins,
        ...toolbars,
        skin: currentSkin,
        skin_url: `/skins/ui/${currentSkin}`,
        setup: (editor: TinyMceEditor) => setupEditor(editor),
        block_formats:
          'Paragraph=p; Heading 1=h1; Heading 2=h2; Heading 3=h3; Heading 4=h4; Heading 5=h5; Heading 6=h6',
        table_toolbar: '',
        table_default_attributes: { border: '1', borderColor: 'none' },
        table_default_styles: { width: '475px', 'border-collapse': 'separate' },
        table_style_by_css: true,
      }}
    />
  );
}

export const basicToolbar = {
  plugins: ['anchor', 'paste', 'autoheight'],
  toolbars: {
    toolbar: 'mycut mycopy mypaste | myundo myredo',
  },
};

export const advancedToolbar = {
  plugins: ['anchor', 'autoheight', 'paste', 'lists', 'searchreplace', 'table'],
  toolbars: {
    toolbar1:
      'reset | mycut mycopy mypaste | myundo myredo | searchreplace | bold italic underline strikethrough | superscript subscript | removeformat',
    toolbar2:
      'blocks | formatselect | table | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent',
  },
};
