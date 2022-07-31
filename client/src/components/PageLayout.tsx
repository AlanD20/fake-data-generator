interface Props {
  children: React.ReactNode;
  className?: string;
}

const PageLayout = ({ children, className = '' }: Props) => (
  <div
    className={`flex flex-col items-center relative w-full h-screen ${className}`}
  >
    {children}
  </div>
);

export default PageLayout;
