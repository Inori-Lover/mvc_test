import { FC, memo } from "react";
import { I_Item } from "../types";

export interface ItemProps {
  data: I_Item;
  index: number;
  onToggle: (nextCheck: boolean, index: number) => void;
}
export const Item: FC<ItemProps> = memo(function Item({
  data,
  index,
  onToggle: toggleHandle,
}) {
  const changeHandle = () => {
    toggleHandle(!data.done, index);
  };
  return (
    <label style={{ display: "block" }}>
      <input type="checkbox" checked={data.done} onChange={changeHandle} />
      <span
        style={{
          textDecoration: data.done ? "line-through" : "unset",
          userSelect: "none",
        }}
      >
        {data.name}
      </span>
    </label>
  );
});
