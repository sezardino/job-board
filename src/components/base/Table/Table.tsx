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

import { twMerge } from "tailwind-merge";
import { Typography } from "..";
import { Icon, IconNames } from "../Icon/Icon";

const sortingIcons: Record<SortDirection | "not-sorted", IconNames> = {
  asc: "HiSortAscending",
  desc: "HiSortDescending",
  "not-sorted": "HiAcademicCap",
};

export interface TableProps<TRowData> extends ComponentPropsWithoutRef<"div"> {
  data: TRowData[];
  columns: ColumnDef<TRowData, any>[];
  sortingState?: SortingState;
  onSortingStateChange?: (state: Updater<SortingState>) => void;
  sortOnTheClient?: boolean;
  noDataMessage?: string;
}

export const Table = <TRowData extends Record<string, any>>(
  props: TableProps<TRowData>
) => {
  const {
    className,
    columns,
    data,
    sortingState,
    onSortingStateChange,
    sortOnTheClient = false,
    noDataMessage,
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

  return (
    <div
      {...rest}
      className={twMerge(
        "p-4 z-0 flex flex-col relative justify-between gap-4 overflow-auto rounded-large shadow-small w-full",
        className
      )}
    >
      <table>
        <thead className="[&>tr]:first:rounded-lg">
          {table.getHeaderGroups().map((headerGroup, index) => (
            <tr
              key={headerGroup.id + index.toString()}
              className="group outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2"
            >
              {headerGroup.headers.map((header, index) => (
                <th
                  key={header.id + index.toString()}
                  className="group px-3 h-10 text-left align-middle bg-default-100 whitespace-nowrap text-foreground-500 text-tiny font-semibold first:rounded-l-lg last:rounded-r-lg data-[sortable=true]:transition-colors data-[sortable=true]:cursor-pointer data-[hover=true]:text-foreground-400 outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2"
                >
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
          {table.getRowModel().rows.length === 0 && (
            <tr>
              <td
                colSpan={table.getHeaderGroups()[0].headers.length}
                className="text-foreground-400 align-middle text-center h-40"
              >
                <Typography tag="span">{noDataMessage}</Typography>
              </td>
            </tr>
          )}
          {table.getRowModel().rows.map((row, index) => (
            <tr
              key={row.id + index.toString()}
              className="group outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2"
            >
              {row.getVisibleCells().map((cell, index) => {
                return (
                  <td
                    key={cell.id + index.toString()}
                    className="py-2 px-3 relative align-middle whitespace-normal text-small font-normal [&>*]:z-1 [&>*]:relative outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 before:content-[''] before:absolute before:z-0 before:inset-0 before:opacity-0 data-[selected=true]:before:opacity-100 group-data-[disabled=true]:text-foreground-300 before:bg-default/40 data-[selected=true]:text-default-foreground first:before:rounded-l-lg last:before:rounded-r-lg"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
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
