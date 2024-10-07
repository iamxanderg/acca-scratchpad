import { CSSProperties } from 'react';
import './styles.scss';

type ButtonProps = {
  onClick: () => void;
  label: string;
  dataTestId?: string;
  disabled?: boolean;
  icon?: any;
  id?: string;
  styles?: CSSProperties;
  classNames?: string;
};

export default function Button(props: ButtonProps): JSX.Element {
  const { onClick, label, dataTestId = 'button', disabled = false, icon, id, styles, classNames } = props;

  return (
    <button
      type="button"
      id={id}
      data-test-id={dataTestId}
      onClick={onClick}
      disabled={disabled}
      style={styles}
      className={classNames}
    >
      <span className="icon">{icon}</span>
      {label}
    </button>
  );
}
