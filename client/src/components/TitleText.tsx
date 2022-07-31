interface Props {
  text: string;
  children?: React.ReactNode | JSX.Element;
  className?: string;
}

const TitleText = ({ text, children, className = '' }: Props) => (
  <h1
    className={`flex gap-2 items-center text-3xl font-bold pb-4 pt-2 capitalize ${className}`}
  >
    <span>{text}</span>
    {children}
  </h1>
);
export default TitleText;
