import {
  Select as NextUiSelect,
  SelectProps as NextUiSelectProps,
  SelectItem,
} from "@nextui-org/react";
import { ChangeEvent } from "react";
import { twMerge } from "tailwind-merge";

export type SelectOption<T extends string> = {
  label: string;
  id: T;
  disabled?: boolean;
};

type Props<T extends string> = {
  options: SelectOption<T>[];
  onSelectChange: (value: T) => void;
  onAfterChange?: (value: T) => void;
  canCancelSelect?: boolean;
};

type OmittedProps = Omit<
  NextUiSelectProps,
  "variant" | "children" | "onChange" | "radius"
>;

export type SelectProps<T extends string> = OmittedProps & Props<T>;

export const Select = <T extends string>(props: SelectProps<T>) => {
  const {
    labelPlacement = "outside",
    canCancelSelect = false,
    onAfterChange,
    selectedKeys,
    onSelectChange,
    options,
    ...rest
  } = props;

  const changeHandler = (evt: ChangeEvent<HTMLSelectElement>) => {
    if (!canCancelSelect && !evt.target.value) return;
    onSelectChange(evt.target.value as T);
    if (onAfterChange) onAfterChange(evt.target.value as T);
  };

  return (
    <NextUiSelect
      {...rest}
      variant="bordered"
      radius="sm"
      labelPlacement={labelPlacement}
      // @ts-ignore
      selectedKeys={selectedKeys ? [selectedKeys] : undefined}
      onChange={changeHandler}
    >
      {options.map((o) => (
        <SelectItem
          isReadOnly={o.disabled}
          key={o.id}
          value={o.label}
          textValue={o.label}
          className={twMerge(o.disabled && "opacity-40 cursor-default")}
        >
          {o.label}
        </SelectItem>
      ))}
    </NextUiSelect>
  );
};
