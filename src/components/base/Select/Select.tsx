import {
  Select as Component,
  SelectProps as ComponentProps,
  SelectItem,
} from "@nextui-org/react";
import { type FC } from "react";

type SelectOption = {
  label: string;
  id: string;
};

type Props = {
  options: SelectOption[];
  selected?: string;
  onSelectedChange: (value: string) => void;
};

type OmittedProps = Omit<
  ComponentProps,
  "variant" | "labelPlacement" | "children"
>;

export type SelectProps = OmittedProps & Props;

export const Select: FC<SelectProps> = (props) => {
  const { selected, onSelectedChange, options, className, ...rest } = props;

  return (
    <Component
      {...rest}
      variant="bordered"
      labelPlacement="outside"
      className="max-w-xs"
      selectedKeys={selected}
      onChange={(evt) => onSelectedChange(evt.currentTarget.value)}
    >
      {options.map((o) => (
        <SelectItem key={o.id} value={o.id}>
          {o.label}
        </SelectItem>
      ))}
    </Component>
  );
};
