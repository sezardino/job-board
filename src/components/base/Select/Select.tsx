import {
  Select as Component,
  SelectProps as ComponentProps,
  SelectItem,
} from "@nextui-org/react";
import { twMerge } from "tailwind-merge";

export type SelectOption<T extends string> = {
  label: string;
  id: T;
  disabled?: boolean;
};

type Props<T extends string> = {
  options: SelectOption<T>[];
  onSelectChange: (value: T) => void;
};

type OmittedProps = Omit<
  ComponentProps,
  "variant" | "labelPlacement" | "children" | "onChange" | "radius"
>;

export type SelectProps<T extends string> = OmittedProps & Props<T>;

export const Select = <T extends string>(props: SelectProps<T>) => {
  const { selectedKeys, onSelectChange, options, ...rest } = props;

  return (
    <Component
      {...rest}
      variant="bordered"
      labelPlacement="outside"
      radius="sm"
      // @ts-ignore
      selectedKeys={selectedKeys ? [selectedKeys] : undefined}
      onChange={(evt) => onSelectChange(evt.target.value as T)}
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
    </Component>
  );
};
