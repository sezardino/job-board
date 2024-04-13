import { CustomersTable } from "@/components/modules/admin/CustomersTable";
import { CustomerUsersResponse } from "@/services/bll/modules/users/schema";
import { type ComponentPropsWithoutRef, type FC } from "react";
import { twMerge } from "tailwind-merge";
import { SearchForm } from "../../../base/SearchForm/SearchForm";
import styles from "./ManageCustomersTemplate.module.scss";

type Props = {
  data?: CustomerUsersResponse;
  isTableDataLoading: boolean;
  onLimitChange: (limit: number) => void;
  onPageChange: (page: number) => void;
  onSearchChange: (search: string) => void;
};

export type ManageCustomersTemplateProps = ComponentPropsWithoutRef<"section"> &
  Props;

export const ManageCustomersTemplate: FC<ManageCustomersTemplateProps> = (
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
    <section {...rest} className={twMerge("", className)}>
      <header className={styles.header}>
        <SearchForm onSearch={onSearchChange} />
      </header>
      <CustomersTable
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
  );
};
