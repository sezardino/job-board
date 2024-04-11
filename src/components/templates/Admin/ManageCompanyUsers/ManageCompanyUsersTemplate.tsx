import { CompanyUsersTable } from "@/components/modules/admin/CompanyUsersTable";
import { CompaniesUsersResponse } from "@/services/bll/modules/users/schema";
import { type ComponentPropsWithoutRef, type FC } from "react";
import { SearchForm } from "../../../base/SearchForm/SearchForm";

import styles from "./ManageCompanyUsersTemplate.module.scss";

type Props = {
  data?: CompaniesUsersResponse;
  isTableDataLoading: boolean;
  onLimitChange: (limit: number) => void;
  onPageChange: (page: number) => void;
  onSearchChange: (search: string) => void;
};

export type ManageCompanyUsersTemplateProps =
  ComponentPropsWithoutRef<"section"> & Props;

export const ManageCompanyUsersTemplate: FC<ManageCompanyUsersTemplateProps> = (
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
      <section {...rest} className={className}>
        <SearchForm onSearch={onSearchChange} className={styles.search} />
        <CompanyUsersTable
          data={data?.data || []}
          isLoading={isTableDataLoading}
          page={data?.meta.page || 0}
          limit={data?.meta.limit || 10}
          total={data?.meta.totalPages || 0}
          onLimitChange={onLimitChange}
          onPageChange={onPageChange}
          className="mt-4"
        />
      </section>
    </>
  );
};
