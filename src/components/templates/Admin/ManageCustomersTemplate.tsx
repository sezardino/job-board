import { CustomerUsersResponse } from "@/services/server/modules/users/schema";
import { createColumnHelper } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { useMemo, type ComponentPropsWithoutRef, type FC } from "react";
import { twMerge } from "tailwind-merge";
import { TableWidget } from "../../UI/TableWidget/TableWidget";
import { UserInfo } from "../../UI/UserInfo/UserInfo";
import { Icon } from "../../base";
import { SearchForm } from "../../base/SearchForm/SearchForm";

type Props = {
  data?: CustomerUsersResponse;
  isTableDataLoading: boolean;
  onLimitChange: (limit: number) => void;
  onPageChange: (page: number) => void;
  onSearchChange: (search: string) => void;
};

export type ManageCustomersTemplateProps = ComponentPropsWithoutRef<"section"> &
  Props;

const CH = createColumnHelper<CustomerUsersResponse["data"][number]>();

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
  const t = useTranslations("page.admin.manage-customers");
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
            avatar={row.row.original.avatar?.url}
          />
        ),
      }),
      CH.accessor("isAcceptInvite", {
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
      CH.accessor("status", {
        enableSorting: false,
        header: t("table.head.status"),
        cell: (row) => userT(`status.${row.getValue()}`),
      }),
    ],
    [t, userT]
  );

  return (
    <section {...rest} className={twMerge("", className)}>
      <header className="flex justify-between gap-3 flex-wrap items-center">
        <SearchForm onSearch={onSearchChange} />
      </header>
      <TableWidget
        // @ts-ignore
        columns={columns}
        data={data?.data || []}
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
  );
};
