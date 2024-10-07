import ScratchPad from 'components/ScratchPad/ScratchPad';
import { useState } from 'react';
import { Editor } from 'tinymce';

export default function App() {
  const [, setEditorRef] = useState<Editor>(null);

  const handleOnEditorCallback = (editor: Editor) => {
    setEditorRef(editor);
  };

  return (
    <div style={{ padding: '10px' }}>
      <ScratchPad onEditorCallback={(editor: Editor) => handleOnEditorCallback(editor)} />
    </div>
  );
}
