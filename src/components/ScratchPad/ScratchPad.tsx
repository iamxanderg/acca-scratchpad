import Button from 'components/Button/Button';
import Dialog from 'components/Dialog/Dialog';
import TinyMCE, { advancedToolbar } from 'components/TinyEditor/TinyEditor';
import { useCallback, useState } from 'react';
import { FaPenToSquare } from 'react-icons/fa6';
import { Editor } from 'tinymce';

type ScratchPadProps = {
  onEditorCallback: (editor: Editor) => void;
};

function ScratchPad(props: ScratchPadProps) {
  const { onEditorCallback } = props;
  const [showDialog, setShowDialog] = useState(false);
  const testApiKey = '3ddty9foqosnnh6g1iyb1f7ox7jc0cl19hiel967lqw2xdu0';

  const onClickOpen = useCallback(() => {
    setShowDialog((c) => !c);
  }, []);

  const closeDialog = useCallback(() => {
    setShowDialog(false);
  }, []);

  return (
    <>
      <Button label="Open Scratch Pad" onClick={onClickOpen} dataTestId="scratchPadButton" icon={<FaPenToSquare />} />
      {showDialog && (
        <Dialog title="Scratch Pad" testId="scratchpad" onClose={closeDialog} width={800} height={500} resizable>
          <TinyMCE apiKey={testApiKey} onEditorCallback={onEditorCallback} {...advancedToolbar} />
        </Dialog>
      )}
    </>
  );
}

export default ScratchPad;
