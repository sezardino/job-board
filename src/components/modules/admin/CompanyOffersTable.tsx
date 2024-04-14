import { CurrentCompanyOffersResponse } from "@/services/bll/modules/offers/schema";

import { createColumnHelper } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { FC, useMemo } from "react";

import { TableActions } from "@/components/UI/TableActions/TableActions";
import {
  TableWidget,
  TableWidgetProps,
} from "@/components/UI/TableWidget/TableWidget";
import { Typography } from "@/components/base/Typography/Typography";
import { AdminPageUrls } from "@/const";
import Link from "next/link";

type Offer = CurrentCompanyOffersResponse["data"][number];

export type ManageCompanyOffersTableAction = {
  type: "edit" | "delete" | "finish" | "archive" | "publish";
  id: string;
};

type Props = {
  companyId: string;
};

type OmittedProps = Omit<TableWidgetProps<Offer>, "columns">;

export type CompanyOffersTableProps = OmittedProps & Props;

const columnHelper = createColumnHelper<Offer>();

export const CompanyOffersTable: FC<CompanyOffersTableProps> = (props) => {
  const { companyId, ...rest } = props;

  const t = useTranslations("components.admin.company-offers-table");
  const entityT = useTranslations("entity");

  const columns = useMemo(
    () => [
      columnHelper.accessor("name", {
        enableSorting: false,
        header: t("name"),
        cell: (row) => row.getValue(),
      }),
      columnHelper.accessor("industry.name", {
        enableSorting: false,
        header: t("industry-category"),
        cell: (row) => (
          <Typography tag="p">
            {entityT(`industries.${row.getValue()}`)} {" / "}
            {entityT(`categories.${row.row.original.category.name}`)}
          </Typography>
        ),
      }),
      columnHelper.accessor("status", {
        enableSorting: false,
        header: t("status"),
        cell: (row) => entityT(`offers.status.${row.getValue()}`),
      }),
      columnHelper.accessor("seniority", {
        enableSorting: false,
        header: t("seniority"),
        cell: (row) => entityT(`offers.seniority.${row.getValue()}`),
      }),
      // columnHelper.accessor("deadlineAt", {
      //   enableSorting: false,
      //   header: t("deadline"),
      //   cell: (row) =>
      //     row.getValue()
      //       ? dayjs(row.getValue()).format(DEFAULT_DATE_FORMAT)
      //       : "-",
      // }),
      columnHelper.accessor("_count.applications", {
        enableSorting: false,
        header: t("applications-count"),
        cell: (row) => row.getValue(),
      }),
      columnHelper.accessor("id", {
        enableSorting: false,
        header: () => null,
        cell: (row) => (
          <TableActions
            actions={[
              {
                icon: "HiEye",
                text: t("actions.preview"),
                as: Link,
                color: "primary",
                href: AdminPageUrls.offer(companyId, row.getValue()),
              },
              {
                key: "applications",
                icon: "HiOutlineUsers",
                text: t("actions.applications"),
                color: "secondary",
                as: Link,
                href: AdminPageUrls.applications(companyId, row.getValue()),
              },
            ]}
          />
        ),
      }),
    ],
    [entityT, companyId, t]
  );

  return (
    <TableWidget {...rest} columns={columns} noDataMessage={t("no-data")} />
  );
};
