import { Pagination as Component } from "@nextui-org/react";
import { type ComponentPropsWithoutRef, type FC } from "react";
import { twMerge } from "tailwind-merge";

export type PaginationProps = ComponentPropsWithoutRef<"div"> & {
  total: number;
  onPageChange: (page: number) => void;
  current: number;
  disabled?: boolean;
};

export const Pagination: FC<PaginationProps> = (props) => {
  const { disabled, total, current, onPageChange, className, ...rest } = props;

  return (
    <Component
      {...rest}
      as="div"
      isCompact
      showControls
      isDisabled={disabled}
      color="warning"
      onChange={(page) => onPageChange(page - 1)}
      total={total}
      page={current}
      className={twMerge(className)}
    />
  );
};
