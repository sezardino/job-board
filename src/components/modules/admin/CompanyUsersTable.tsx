import { Icon } from "@/components/base/Icon/Icon";
import { CompaniesUsersResponse } from "@/services/bll/modules/users/schema";
import { createColumnHelper } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { useMemo, type FC } from "react";
import {
  TableWidget,
  TableWidgetProps,
} from "../../UI/TableWidget/TableWidget";
import { UserInfo } from "../../UI/UserInfo/UserInfo";

type CompanyMember = CompaniesUsersResponse["data"][number];

type PickedProps = Pick<
  TableWidgetProps<CompanyMember>,
  | "data"
  | "onLimitChange"
  | "onPageChange"
  | "isLoading"
  | "className"
  | "page"
  | "limit"
  | "total"
>;

export type CompanyUsersTableProps = PickedProps;

const CH = createColumnHelper<CompanyMember>();
export const CompanyUsersTable: FC<CompanyUsersTableProps> = (props) => {
  const t = useTranslations("page.admin.company-users");
  const userT = useTranslations("entity.users");

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
    <TableWidget
      {...props}
      // @ts-ignore
      columns={columns}
      noDataMessage={t("table.no-data")}
    />
  );
};
