import { CompaniesUsersResponse } from "@/services/server/modules/users/schema";
import { createColumnHelper } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { useMemo, type ComponentPropsWithoutRef, type FC } from "react";
import { twMerge } from "tailwind-merge";
import { TableWidget } from "../../UI/TableWidget/TableWidget";
import { UserInfo } from "../../UI/UserInfo/UserInfo";
import { Icon } from "../../base";
import { SearchForm } from "../../base/SearchForm/SearchForm";

type Props = {
  data?: CompaniesUsersResponse;
  isTableDataLoading: boolean;
  onLimitChange: (limit: number) => void;
  onPageChange: (page: number) => void;
  onSearchChange: (search: string) => void;
};

export type AdminUserManagementTemplateProps =
  ComponentPropsWithoutRef<"section"> & Props;

const CH = createColumnHelper<CompaniesUsersResponse["users"][number]>();

export const AdminUserManagementTemplate: FC<
  AdminUserManagementTemplateProps
> = (props) => {
  const {
    data,
    isTableDataLoading,
    onLimitChange,
    onPageChange,
    onSearchChange,
    className,
    ...rest
  } = props;
  const t = useTranslations("page.admin.manage-company-users");
  const userT = useTranslations("entity.user");

  const columns = useMemo(
    () => [
      CH.accessor("email", {
        enableSorting: false,
        header: t("table.head.info"),
        cell: (row) => (
          <UserInfo
            name={row.row.original.name}
            email={row.row.original.email}
          />
        ),
      }),
      CH.accessor("isEmailVerified", {
        enableSorting: false,
        header: t("table.head.is-email-verified"),
        cell: (row) => (
          <Icon
            name={row.getValue() ? "HiCheckCircle" : "HiXCircle"}
            color={row.getValue() ? "green" : "red"}
            size={16}
          />
        ),
      }),
      CH.accessor("company.name", {
        enableSorting: false,
        header: t("table.head.company"),
      }),
      CH.accessor("role", {
        enableSorting: false,
        header: t("table.head.role"),
        cell: (row) => userT(`role.${row.getValue()}`),
      }),
      CH.accessor("status", {
        enableSorting: false,
        header: t("table.head.status"),
        cell: (row) => userT(`status.${row.getValue()}`),
      }),
    ],
    [t, userT]
  );

  return (
    <>
      <section {...rest} className={twMerge("", className)}>
        <header className="flex justify-between gap-3 flex-wrap items-center">
          <SearchForm onSearch={onSearchChange} />
        </header>
        <TableWidget
          // @ts-ignore
          columns={columns}
          data={data?.users || []}
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
