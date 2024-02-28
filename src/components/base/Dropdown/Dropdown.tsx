import { ReactNode, type FC } from "react";
import { twMerge } from "tailwind-merge";

import {
  DropdownMenu,
  DropdownTrigger,
  Dropdown as NextUIDropdown,
  DropdownItem as NextUIDropdownItem,
  DropdownProps as NextUIDropdownProps,
  Tooltip,
} from "@nextui-org/react";
import NextLink from "next/link";

type DropdownItem = {
  label: string;
  onClick?: () => void;
  href?: string;
  tooltip?: string;
  disabled?: boolean;
  hidden?: boolean;
};

type OmittedProps = Omit<NextUIDropdownProps, "children">;

type Props = {
  children: ReactNode;
  items: DropdownItem[];
};

export type DropdownProps = OmittedProps & Props;

export const Dropdown: FC<DropdownProps> = (props) => {
  const { items, className, children, ...rest } = props;

  return (
    <NextUIDropdown {...rest} className={twMerge("", className)}>
      <DropdownTrigger>{children}</DropdownTrigger>

      <DropdownMenu>
        {items.map(({ label, disabled, href, onClick, tooltip, hidden }) => (
          <NextUIDropdownItem
            key={label}
            as={href ? NextLink : undefined}
            isReadOnly={true}
            isDisabled={disabled}
            className={hidden ? "hidden" : ""}
            onClick={onClick}
          >
            {tooltip ? (
              <Tooltip placement="left" offset={20} content={tooltip}>
                <div>{label}</div>
              </Tooltip>
            ) : (
              label
            )}
          </NextUIDropdownItem>
        ))}
      </DropdownMenu>
    </NextUIDropdown>
  );
};
