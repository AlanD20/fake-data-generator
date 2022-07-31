interface Props {
  label?: string;
  type?: 'submit' | 'button' | 'reset';
  children?: React.ReactNode | JSX.Element;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button = ({
  label,
  type = 'submit',
  children,
  className,
  onClick,
}: Props) => (
  <button
    type={type}
    className={`btn btn-primary btn-md capitalize flex gap-2 items-center ${className}`}
    onClick={onClick}
  >
    {children}
    <span>{label}</span>
  </button>
);

export default Button;
