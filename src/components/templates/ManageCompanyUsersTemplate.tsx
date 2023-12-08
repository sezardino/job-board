import { CompanyUsersResponse } from "@/services/server/modules/users/schema";
import { createColumnHelper } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { useMemo, type ComponentPropsWithoutRef, type FC } from "react";
import { twMerge } from "tailwind-merge";
import { TableWidget } from "../UI/TableWidget/TableWidget";
import { Icon, Typography } from "../base";
import { SearchForm } from "../base/SearchForm/SearchForm";

type Props = {
  data?: CompanyUsersResponse;
  isTableDataLoading: boolean;
  onLimitChange: (limit: number) => void;
  onPageChange: (page: number) => void;
  onSearchChange: (search: string) => void;
};

export type ManageCompanyUsersProps = ComponentPropsWithoutRef<"section"> &
  Props;

const CH = createColumnHelper<CompanyUsersResponse["users"][number]>();

export const ManageCompanyUsers: FC<ManageCompanyUsersProps> = (props) => {
  const {
    data,
    isTableDataLoading,
    onLimitChange,
    onPageChange,
    onSearchChange,
    className,
    ...rest
  } = props;
  const t = useTranslations("page.manage-company-users");
  const userT = useTranslations("entity.user");

  const columns = useMemo(
    () => [
      CH.accessor("email", {
        enableSorting: false,
        header: t("table.head.email"),
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
      CH.accessor("company", {
        enableSorting: false,
        header: t("table.head.company"),
        cell: (row) => (
          <div>
            <Typography tag="p">{row.row.original.company.name}</Typography>
            <Typography tag="p">
              {row.row.original.company.owner.email}
            </Typography>
          </div>
        ),
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
