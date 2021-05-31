import { FC, memo, useCallback } from "react";
import { Item } from "./item";
import { I_Item } from "../types";

export interface ListProps {
  data: I_Item[];
  onChange: (nextList: I_Item[]) => void;
}
export const List: FC<ListProps> = memo(function List({ data, onChange }) {
  const changeHandle = useCallback(
    (item: I_Item, index: number) => {
      const clone = [...data];
      clone[index] = item;
      onChange(clone);
    },
    [onChange, data]
  );
  const deleteHandle = useCallback(
    (idx: number) => {
      onChange(data.filter((_, index) => idx !== index));
    },
    [onChange, data]
  );

  return (
    <>
      {data.map((item, index) => (
        <Item
          key={item.key}
          index={index}
          data={item}
          onChanhe={changeHandle}
          onDelete={deleteHandle}
        />
      ))}
      <div>total: {data.length}</div>
    </>
  );
});
