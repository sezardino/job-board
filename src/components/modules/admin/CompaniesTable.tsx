import { TableActions } from "@/components/UI/TableActions/TableActions";
import {
  TableWidget,
  TableWidgetProps,
} from "@/components/UI/TableWidget/TableWidget";
import { UserInfo } from "@/components/UI/UserInfo/UserInfo";
import { AdminPageUrls } from "@/const";
import { AdminCompaniesResponse } from "@/services/bll/modules/companies/schema";
import { createColumnHelper } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useMemo, type FC } from "react";

type Company = AdminCompaniesResponse["data"][number];

export type CompaniesTableProps = Omit<TableWidgetProps<Company>, "columns">;

const CH = createColumnHelper<Company>();

export const CompaniesTable: FC<CompaniesTableProps> = (props) => {
  const t = useTranslations("components.admin.companies-table");

  const columns = useMemo(
    () => [
      CH.accessor("name", {
        enableSorting: false,
        header: t("head.name"),
      }),
      CH.accessor("owner", {
        enableSorting: false,
        header: t("head.owner"),
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
        header: t("head.members"),
        cell: (row) => (
          <span className="justify-self-center">{row.getValue()}</span>
        ),
      }),
      CH.accessor("_count.offers", {
        enableSorting: false,
        header: t("head.offers"),
      }),
      CH.accessor("id", {
        enableSorting: false,
        header: () => null,
        cell: (cell) => (
          <TableActions
            actions={[
              {
                icon: "HiEye",
                color: "primary",
                text: t("actions.more"),
                as: Link,
                href: AdminPageUrls.companyOffers(cell.getValue()),
              },
            ]}
          />
        ),
      }),
    ],
    [t]
  );

  return (
    <TableWidget
      {...props}
      // @ts-ignore
      columns={columns}
      noDataMessage={t("no-data")}
      className="mt-4"
    />
  );
};
