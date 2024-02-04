import {
  Select as NextUiSelect,
  SelectProps as NextUiSelectProps,
  SelectItem,
} from "@nextui-org/react";
import { twMerge } from "tailwind-merge";

export type SelectOption<T extends string> = {
  label: string;
  id: T;
  disabled?: boolean;
};

type CommonProps<T extends string, M> = {
  options: SelectOption<T>[];
  isMultiple: M;
  canCancelSelect?: boolean;
};

type SingleProps<T extends string> = {
  isMultiple: false;
  onSelectChange: (value: T) => void;
  onAfterChange?: (value: T) => void;
};

type MultipleProps<T extends string> = {
  isMultiple: true;
  onSelectChange: (value: T[]) => void;
  onAfterChange?: (value: T[]) => void;
};

type OmittedProps = Omit<
  NextUiSelectProps,
  "variant" | "children" | "onChange" | "radius" | "selectionMode"
>;

type Props<T extends string, M extends boolean> = CommonProps<T, M> &
  (SingleProps<T> | MultipleProps<T>);

export type SelectProps<T extends string, M extends boolean> = OmittedProps &
  Props<T, M>;

export const Select = <T extends string, M extends boolean>(
  props: SelectProps<T, M>
) => {
  const {
    isMultiple,
    labelPlacement = "outside",
    canCancelSelect = false,
    onAfterChange,
    selectedKeys,
    onSelectChange,
    options,
    ...rest
  } = props;

  const changeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = isMultiple
      ? Array.from(new Set(e.target.value.split(","))).filter(Boolean)
      : e.target.value;

    if (!canCancelSelect && !value) return;
    onSelectChange(value as T & T[]);
    if (onAfterChange) onAfterChange(value as T & T[]);
  };

  return (
    <NextUiSelect
      {...rest}
      selectionMode={isMultiple ? "multiple" : "single"}
      variant="bordered"
      radius="sm"
      labelPlacement={labelPlacement}
      // @ts-ignore
      selectedKeys={
        !selectedKeys
          ? undefined
          : Array.isArray(selectedKeys)
          ? selectedKeys
          : [selectedKeys]
      }
      onChange={changeHandler}
    >
      {options.map((o) => (
        <SelectItem
          isReadOnly={o.disabled}
          key={o.id}
          value={o.id}
          textValue={o.label}
          className={twMerge(o.disabled && "opacity-40 cursor-default")}
        >
          {o.label}
        </SelectItem>
      ))}
    </NextUiSelect>
  );
};
