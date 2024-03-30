import { Pagination } from "@/components/base/Pagination/Pagination";
import { Table, TableProps } from "@/components/base/Table/Table";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { type ComponentPropsWithoutRef } from "react";

type Props = {
  page: number;
  limit: number;
  total: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
};

type TablePickedProps<TRowData> = Pick<
  TableProps<TRowData>,
  | "data"
  | "columns"
  | "sortingState"
  | "onSortingStateChange"
  | "sortOnTheClient"
  | "noDataMessage"
  | "isLoading"
>;

export type TableWidgetProps<TRowData> = ComponentPropsWithoutRef<"div"> &
  Props &
  TablePickedProps<TRowData>;

const DEFAULT_LIMIT_ITEMS = [10, 25, 50, 100];

export const TableWidget = <TRowData extends Record<string, any>>(
  props: TableWidgetProps<TRowData>
) => {
  const {
    columns,
    data,
    sortingState,
    onSortingStateChange,
    sortOnTheClient = false,
    isLoading = false,
    noDataMessage,
    // pagination
    page,
    onPageChange,
    limit,
    onLimitChange,
    total,
    className,
    ...rest
  } = props;

  const isFooterVisible = total > 1;

  return (
    <div {...rest} className={className}>
      <Table
        columns={columns}
        data={data}
        isLoading={isLoading}
        noDataMessage={noDataMessage}
      />
      {isFooterVisible && (
        <div className="mt-3 flex justify-center gap-3 flex-wrap items-center">
          <Pagination
            disabled={isLoading}
            current={page}
            onPageChange={onPageChange}
            total={total}
          />
          <Dropdown isDisabled={isLoading}>
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
      )}
    </div>
  );
};
