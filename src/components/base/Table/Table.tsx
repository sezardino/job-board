import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState,
} from "@tanstack/react-table";
import {
  type ColumnDef,
  type SortDirection,
  type Updater,
} from "@tanstack/table-core";
import { type ComponentPropsWithoutRef } from "react";

import { Skeleton } from "@nextui-org/react";
import { twMerge } from "tailwind-merge";
import { Icon, IconNames } from "../Icon/Icon";
import { Typography } from "../Typography/Typography";

import styles from "./Table.module.scss";

const sortingIcons: Record<SortDirection | "not-sorted", IconNames> = {
  asc: "HiSortAscending",
  desc: "HiSortDescending",
  "not-sorted": "HiAcademicCap",
};

type Props<TRowData> = {
  data: TRowData[];
  columns: ColumnDef<TRowData, any>[];
  sortingState?: SortingState;
  onSortingStateChange?: (state: Updater<SortingState>) => void;
  sortOnTheClient?: boolean;
  noDataMessage?: string;
  isLoading?: boolean;
};

export type TableProps<TRowData> = ComponentPropsWithoutRef<"div"> &
  Props<TRowData>;

export const Table = <TRowData extends Record<string, any>>(
  props: TableProps<TRowData>
) => {
  const {
    columns,
    data,
    sortingState,
    onSortingStateChange,
    sortOnTheClient = false,
    isLoading = false,
    noDataMessage,
    className,
    ...rest
  } = props;

  const table = useReactTable({
    columns,
    data: data,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: sortingState ? { sorting: sortingState } : undefined,
    onSortingChange: onSortingStateChange,
    manualSorting: !sortOnTheClient,
  });

  const isPlaceholderShowed =
    table.getRowModel().rows.length === 0 || isLoading;

  return (
    <div {...rest} className={twMerge(styles.element, className)}>
      <table>
        <thead className={styles.thead}>
          {table.getHeaderGroups().map((headerGroup, index) => (
            <tr key={headerGroup.id + index.toString()} className={styles.tr}>
              {headerGroup.headers.map((header, index) => (
                <th key={header.id + index.toString()} className={styles.th}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  {header.column.getCanSort() && (
                    <>
                      <button onClick={header.column.getToggleSortingHandler()}>
                        <Icon
                          size={12}
                          className="ml-1"
                          name={
                            sortingIcons[
                              header.column.getIsSorted() || "not-sorted"
                            ]
                          }
                        />
                      </button>
                    </>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {isPlaceholderShowed && (
            <tr>
              <td
                colSpan={table.getHeaderGroups()[0].headers.length}
                className={styles.loaderTd}
              >
                {isLoading && <Skeleton className={styles.loader} />}
                {!isLoading && table.getRowModel().rows.length === 0 && (
                  <Typography tag="span">{noDataMessage}</Typography>
                )}
              </td>
            </tr>
          )}
          {!isPlaceholderShowed &&
            table.getRowModel().rows.map((row, index) => (
              <tr key={row.id + index.toString()} className={styles.tr}>
                {row.getVisibleCells().map((cell, index) => {
                  return (
                    <td key={cell.id + index.toString()} className={styles.td}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
