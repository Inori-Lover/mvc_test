import { FC, FormEvent, memo, useCallback, useState } from "react";
import { List } from "./components/list";
import { I_Item } from "./types";
import { id } from "./util";

interface InputProps {
  onSubmit: (task: string) => void;
}
const Input: FC<InputProps> = memo(function Input({ onSubmit }) {
  const [name, setName] = useState("");

  const submitHandle = (evt: FormEvent) => {
    evt.preventDefault();
    if (!name) {
      return;
    }
    onSubmit(name);
    setName("");
  };

  return (
    <form onSubmit={submitHandle}>
      <input
        type="text"
        value={name}
        onChange={(evt) => setName(evt.currentTarget.value)}
        placeholder="new task"
      />
    </form>
  );
});

export const Entry = memo(function Entry() {
  const [taskList, setTaskList] = useState<I_Item[]>([]);

  const submitHandle = useCallback((name: string) => {
    setTaskList((pre) => [...pre, { key: id(), name, done: false }]);
  }, []);

  return (
    <>
      <head>todo mvc</head>
      <Input onSubmit={submitHandle} />
      <List data={taskList} onChange={setTaskList} />
    </>
  );
});
