import React from "react";

interface GutterProps {
  left?: boolean;
  right?: boolean;
  children: JSX.Element;
}

const Gutter: React.FC<GutterProps> = ({
  left,
  right,
  children,
}: GutterProps) => {
  return <div className='bg-primary px-5 py-2'>{children}</div>;
};

export default Gutter;
