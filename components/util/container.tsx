import { twMerge } from "tailwind-merge";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

const Container = ({ children, className }: ContainerProps) => {
  return (
    <div className={twMerge("relative p-[5vw] w-full", className)}>
      {children}
    </div>
  );
};

export default Container;
