import { FC, memo, useCallback, useState } from "react";
import { I_Item } from "../types";
import { Input } from "../components/input";

import "./index.css";

export interface ItemProps {
  data: I_Item;
  index: number;
  onChanhe: (nextItem: I_Item, index: number) => void;
  onDelete: (index: number) => void;
}
export const Item: FC<ItemProps> = memo(function Item({
  data,
  index,
  onChanhe,
  onDelete,
}) {
  const toggleHandle = () => {
    onChanhe({ ...data, done: !data.done }, index);
  };
  const [editMode, setEditMode] = useState(false);
  const nameChangeHandle = useCallback(
    (name: string) => {
      onChanhe({ ...data, name }, index);
      setEditMode(false);
    },
    [data, index, onChanhe]
  );
  const deleteHandle = () => {
    onDelete(index);
  };

  return (
    <div style={{ display: "flex" }} className="item-wraper">
      <input type="checkbox" checked={data.done} onChange={toggleHandle} />
      {editMode ? (
        <Input
          defaultValue={data.name}
          onSubmit={nameChangeHandle}
          onBlur={nameChangeHandle}
        />
      ) : (
        <div
          style={{
            textDecoration: data.done ? "line-through" : "unset",
            userSelect: "none",
          }}
          className="task-name"
          onDoubleClick={() => setEditMode(true)}
        >
          {data.name}
        </div>
      )}

      <div
        className={`deleteIcon ${editMode ? "hide" : ""}`}
        onClick={deleteHandle}
      >
        x
      </div>
    </div>
  );
});
