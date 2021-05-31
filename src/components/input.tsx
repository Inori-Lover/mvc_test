import { FC, FormEvent, FocusEvent, memo, useState } from "react";

export interface InputProps {
  defaultValue?: string;
  onSubmit: (task: string) => void;
  onBlur?: (task: string) => void;
}
export const Input: FC<InputProps> = memo(function Input({
  defaultValue = "",
  onSubmit,
  onBlur,
}) {
  const [name, setName] = useState(defaultValue);

  const submitHandle = (evt: FormEvent) => {
    evt.preventDefault();
    if (!name) {
      return;
    }
    onSubmit(name);
    setName("");
  };
  const blurHandle = (evt: FocusEvent<HTMLInputElement>) => {
    evt.preventDefault();

    if (onBlur) {
      onBlur(name);
    }
  };

  return (
    <form onSubmit={submitHandle}>
      <input
        type="text"
        value={name}
        onChange={(evt) => setName(evt.currentTarget.value)}
        placeholder="new task"
        onBlur={blurHandle}
      />
    </form>
  );
});
