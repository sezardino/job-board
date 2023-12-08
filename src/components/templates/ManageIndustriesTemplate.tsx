import { AdminIndustriesResponse } from "@/services/server/modules/industries/schema";
import { createColumnHelper } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { useMemo, type ComponentPropsWithoutRef, type FC } from "react";
import { twMerge } from "tailwind-merge";
import { TableWidget } from "../UI/TableWidget/TableWidget";
import { TitleDescription } from "../UI/TitleDescription/TitleDescription";
import { SearchForm } from "../base/SearchForm/SearchForm";

type Props = {
  data?: AdminIndustriesResponse;
  isTableDataLoading: boolean;
  onLimitChange: (limit: number) => void;
  onPageChange: (page: number) => void;
  onSearchChange: (search: string) => void;
};

export type ManageIndustriesTemplateProps =
  ComponentPropsWithoutRef<"section"> & Props;

const CH = createColumnHelper<AdminIndustriesResponse["industries"][number]>();

export const ManageIndustriesTemplate: FC<ManageIndustriesTemplateProps> = (
  props
) => {
  const {
    data,
    isTableDataLoading,
    onLimitChange,
    onPageChange,
    onSearchChange,
    className,
    ...rest
  } = props;
  const t = useTranslations("page.manage-industries");
  const statusT = useTranslations("entity.status");

  const columns = useMemo(
    () => [
      CH.accessor("name", {
        enableSorting: false,
        header: t("table.head.name"),
      }),
      CH.accessor("status", {
        enableSorting: false,
        header: t("table.head.status"),
        cell: (row) => statusT(row.getValue()),
      }),
      CH.accessor("_count.categories", {
        enableSorting: false,
        header: t("table.head.categories"),
      }),
      CH.accessor("_count.offers", {
        enableSorting: false,
        header: t("table.head.offers"),
      }),
    ],
    [t, statusT]
  );

  return (
    <>
      <section
        {...rest}
        className={twMerge("grid grid-cols-1 gap-4", className)}
      >
        <TitleDescription
          title={t("title")}
          titleLevel="h1"
          description={t("description")}
        />
        <header className="flex justify-between gap-3 flex-wrap items-center">
          <SearchForm onSearch={onSearchChange} placeholder={t("search")} />
        </header>
        <TableWidget
          // @ts-ignore
          columns={columns}
          data={data?.industries || []}
          isLoading={isTableDataLoading}
          noDataMessage={t("table.no-data")}
          page={data?.meta.page || 0}
          limit={data?.meta.limit || 10}
          total={data?.meta.totalPages || 0}
          className="mt-4"
          onLimitChange={onLimitChange}
          onPageChange={onPageChange}
        />
      </section>
    </>
  );
};
