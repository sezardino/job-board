import { CompaniesTable } from "@/components/modules/admin/CompaniesTable";
import { AdminCompaniesResponse } from "@/services/bll/modules/companies/schema";
import { type ComponentPropsWithoutRef, type FC } from "react";
import { twMerge } from "tailwind-merge";
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
