import React from "react";
import Select, { ActionMeta } from "react-select";

interface Option {
  label: string;
  value: string;
}

interface CustomSelectProps {
  options: Option[];
  value: Option | null;
  onChange: (key:any) => void;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  value,
  onChange,
}) => {
  return (
    <div className="w-9">
      <Select
        onChange={onChange}
        defaultValue={value}
        value={value}
        options={options}
      />
    </div>
  );
};

export default CustomSelect;
