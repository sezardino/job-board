import { Icon } from "@/components/base/Icon/Icon";
import { AdminUsersResponse } from "@/services/bll/modules/users/schema";
import { createColumnHelper } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { useMemo, type FC } from "react";

import {
  TableWidget,
  TableWidgetProps,
} from "@/components/UI/TableWidget/TableWidget";
import { UserInfo } from "@/components/UI/UserInfo/UserInfo";

type AdminUser = AdminUsersResponse["data"][number];

export type AdminsTableProps = Omit<TableWidgetProps<AdminUser>, "columns">;

const CH = createColumnHelper<AdminUsersResponse["data"][number]>();

export const AdminsTable: FC<AdminsTableProps> = (props) => {
  const t = useTranslations("page.admin.manage-admins");
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
