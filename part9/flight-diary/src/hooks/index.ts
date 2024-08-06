import { useState } from "react";

export interface Field {
  type: string;
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export type ResetFunction = () => void;

export const useField = (
  type: string,
  name: string
): [Field, ResetFunction] => {
  const [value, setValue] = useState("");

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const reset: ResetFunction = () => {
    setValue("");
  };

  const field: Field = { type, name, value, onChange };

  return [field, reset];
};
