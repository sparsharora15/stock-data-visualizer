import React from "react";
import { RoutesProps } from "react-router-dom";

interface GutterProps {
  children: JSX.Element | React.ReactElement | null;
}

const Gutter: React.FC<GutterProps> = ({ children }: GutterProps) => {
  return <div className=" px-5 py-[2.2rem] bg-main">{children}</div>;
};

export default Gutter;
