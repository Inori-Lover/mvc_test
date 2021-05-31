import {
  FC,
  FormEvent,
  ChangeEventHandler,
  memo,
  useCallback,
  useState,
  useMemo,
} from "react";
import { List } from "./components/list";
import { Input } from "./components/input";
import { I_Item } from "./types";
import { id } from "./util";

export const Entry = memo(function Entry() {
  const [taskList, setTaskList] = useState<I_Item[]>([
    { key: id(), name: "pending", done: false },
    { key: id(), name: "done", done: true },
  ]);

  const submitHandle = useCallback((name: string) => {
    setTaskList((pre) => [...pre, { key: id(), name, done: false }]);
  }, []);

  const [displayPart, setDisplayPart] = useState("all");
  const switchDisplayPartHandle: ChangeEventHandler<HTMLInputElement> = (
    evt
  ) => {
    setDisplayPart(evt.currentTarget.value);
  };

  const dataList = useMemo(() => {
    switch (displayPart) {
      case "all": {
        return taskList;
      }
      case "pending": {
        return taskList.filter((item) => !item.done);
      }
      case "done": {
        return taskList.filter((item) => item.done);
      }
      default: {
        return [];
      }
    }
  }, [displayPart, taskList]);

  return (
    <section>
      <h1>todo mvc</h1>
      <div>
        <Input onSubmit={submitHandle} />
        <label>
          <input
            type="radio"
            name="display-part"
            onChange={switchDisplayPartHandle}
            value="all"
            checked={displayPart === "all"}
          />{" "}
          显示全部
        </label>
        <label>
          <input
            type="radio"
            name="display-part"
            onChange={switchDisplayPartHandle}
            value="pending"
            checked={displayPart === "pending"}
          />{" "}
          显示未完成
        </label>
        <label>
          <input
            type="radio"
            name="display-part"
            onChange={switchDisplayPartHandle}
            value="done"
            checked={displayPart === "done"}
          />{" "}
          显示已完成
        </label>
        <hr />
        <List data={dataList} total={taskList.length} onChange={setTaskList} />
      </div>
    </section>
  );
});
