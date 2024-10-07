import { ReactNode } from 'react';
import Draggable from 'react-draggable';
import './styles.scss';

type DialogProps = {
  children: ReactNode;
  onClose: () => void;
  width?: number;
  height?: number;
  title?: string;
  icon?: any;
  resizable?: boolean;
  testId?: string;
};

function Dialog(props: DialogProps) {
  const { children, onClose, width, height, title = '', icon, resizable = false, testId } = props;
  const isResizable = resizable ? 'dialog-resizeable resize-xy' : '';

  return (
    <Draggable handle=".dialog-header" bounds="body">
      <div className="dialog" data-testId={testId}>
        <div className="dialog-header">
          <span>
            {icon && <span className="header-icon">{icon}</span>}
            {title}
          </span>
          <button title="Close" onClick={onClose}>
            x
          </button>
        </div>
        <div
          style={{
            width: width,
            height: height,
            minWidth: '150px',
            minHeight: '200px',
          }}
          className={`dialog-content ${isResizable}`}
        >
          {children}
        </div>
      </div>
    </Draggable>
  );
}

export default Dialog;
