import { Table, TableProps } from "@/components/base/Table/Table";
import { PaginationWidget } from "@/components/modules/shared/PaginationWidget/PaginationWidget";
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
        <PaginationWidget
          disabled={isLoading}
          current={page}
          onPageChange={onPageChange}
          limit={limit}
          onLimitChange={onLimitChange}
          total={total}
          className="mt-3"
        />
      )}
    </div>
  );
};
