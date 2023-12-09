import {
  Select as Component,
  SelectProps as ComponentProps,
  SelectItem,
} from "@nextui-org/react";
import { type FC } from "react";
import { twMerge } from "tailwind-merge";

type SelectOption = {
  label: string;
  id: string;
  disabled?: boolean;
};

type Props = {
  options: SelectOption[];
  onChange: (value: string) => void;
};

type OmittedProps = Omit<
  ComponentProps,
  "variant" | "labelPlacement" | "children"
>;

export type SelectProps = OmittedProps & Props;

export const Select: FC<SelectProps> = (props) => {
  const { selectedKeys, onChange, options, className, ...rest } = props;

  return (
    <Component
      {...rest}
      variant="bordered"
      labelPlacement="outside"
      className={className}
      // @ts-ignore
      selectedKeys={selectedKeys ? [selectedKeys] : undefined}
      onChange={(evt) => onChange(evt.target.value)}
    >
      {options.map((o) => (
        <SelectItem
          isReadOnly={o.disabled}
          key={o.id}
          value={o.id}
          className={twMerge(o.disabled && "opacity-40 cursor-default")}
        >
          {o.label}
        </SelectItem>
      ))}
    </Component>
  );
};
