interface Props {
  onSubmit: React.ChangeEventHandler<HTMLFormElement>;
  children: React.ReactNode | JSX.Element;
  className?: string;
}

const FormControl = ({ onSubmit, children, className = '' }: Props) => (
  <form onSubmit={onSubmit} className={`form-control w-[40ch] ${className}`}>
    {children}
  </form>
);

export default FormControl;
