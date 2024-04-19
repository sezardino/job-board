import { Pagination } from "@/components/base/Pagination/Pagination";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { ComponentPropsWithoutRef, FC } from "react";
import { twMerge } from "tailwind-merge";

import styles from "./PaginationWidget.module.scss";

type Props = {
  disabled: boolean;
  current: number;
  total: number;
  onPageChange: (page: number) => void;
  limit: number;
  onLimitChange: (limit: number) => void;
};

export type PaginationWidgetProps = ComponentPropsWithoutRef<"div"> & Props;

const DEFAULT_LIMIT_ITEMS = [10, 25, 50, 100];

export const PaginationWidget: FC<PaginationWidgetProps> = (props) => {
  const {
    current,
    disabled,
    limit,
    onLimitChange,
    onPageChange,
    total,
    className,
    ...rest
  } = props;

  return (
    <div {...rest} className={twMerge(styles.element, className)}>
      <Pagination
        disabled={disabled}
        current={current}
        onPageChange={onPageChange}
        total={total}
      />
      <Dropdown isDisabled={disabled}>
        <DropdownTrigger>
          <Button size="md" variant="bordered" className="capitalize">
            {limit}
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Items per page"
          variant="flat"
          disallowEmptySelection
          selectionMode="single"
          selectedKeys={[limit]}
          onSelectionChange={(value) =>
            onLimitChange(Number(Array.from(value)[0]))
          }
        >
          {DEFAULT_LIMIT_ITEMS.map((item) => (
            <DropdownItem key={item}>{item}</DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};
