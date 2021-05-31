import { FC, memo, useCallback } from "react";
import { Item } from "./item";
import { I_Item } from "../types";

export interface ListProps {
  data: I_Item[];
  onChange: (nextList: I_Item[]) => void;
}
export const List: FC<ListProps> = memo(function List({ data, onChange }) {
  const toggleHandle = useCallback(
    (nextCheck: boolean, index: number) => {
      const clone = [...data];
      clone[index] = { ...clone[index] };
      clone[index].done = nextCheck;
      onChange(clone);
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
          onToggle={toggleHandle}
        />
      ))}
    </>
  );
});
