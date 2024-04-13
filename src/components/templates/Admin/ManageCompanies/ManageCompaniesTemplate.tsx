import { CompaniesTable } from "@/components/modules/admin/CompaniesTable";
import { AdminCompaniesResponse } from "@/services/bll/modules/companies/schema";
import { createColumnHelper } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { useMemo, type ComponentPropsWithoutRef, type FC } from "react";
import { twMerge } from "tailwind-merge";
import { UserInfo } from "../../../UI/UserInfo/UserInfo";
import { SearchForm } from "../../../base/SearchForm/SearchForm";

import styles from "./ManageCompaniesTemplate.module.scss";

type Props = {
  data?: AdminCompaniesResponse;
  isTableDataLoading: boolean;
  onLimitChange: (limit: number) => void;
  onPageChange: (page: number) => void;
  onSearchChange: (search: string) => void;
};

export type ManageCompaniesTemplateProps = ComponentPropsWithoutRef<"section"> &
  Props;

const CH = createColumnHelper<AdminCompaniesResponse["data"][number]>();

export const ManageCompaniesTemplate: FC<ManageCompaniesTemplateProps> = (
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
  const t = useTranslations("page.admin.manage-companies");

  const columns = useMemo(
    () => [
      CH.accessor("name", {
        enableSorting: false,
        header: t("table.head.name"),
      }),
      CH.accessor("owner", {
        enableSorting: false,
        header: t("table.head.owner"),
        cell: (row) => (
          <UserInfo
            name={row.getValue().name}
            email={row.getValue().email}
            avatar={row.getValue().avatar?.url}
          />
        ),
      }),
      CH.accessor("_count.members", {
        enableSorting: false,
        header: t("table.head.members"),
      }),
      CH.accessor("_count.offers", {
        enableSorting: false,
        header: t("table.head.offers"),
      }),
    ],
    [t]
  );

  return (
    <>
      <section {...rest} className={twMerge("", className)}>
        <header className={styles.header}>
          <SearchForm onSearch={onSearchChange} />
        </header>
        <CompaniesTable
          data={data?.data || []}
          isLoading={isTableDataLoading}
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
