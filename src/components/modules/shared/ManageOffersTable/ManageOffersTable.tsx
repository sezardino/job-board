import { createColumnHelper } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { FC, useMemo } from "react";

import {
  TableWidget,
  TableWidgetProps,
} from "@/components/UI/TableWidget/TableWidget";
import { Typography } from "@/components/base/Typography/Typography";
import { OffersForManageResponse } from "@/services/bll/modules/offers/schema";

type Offer = OffersForManageResponse["data"][number];

export type ManageOffersTableCellRenderFun = (offer: Offer) => JSX.Element;

type Props = {
  actionsCell?: (offer: Offer) => JSX.Element;
};

type OmittedProps = Omit<TableWidgetProps<Offer>, "columns">;

export type ManageOffersTableProps = OmittedProps & Props;

const columnHelper = createColumnHelper<Offer>();

export const ManageOffersTable: FC<ManageOffersTableProps> = (props) => {
  const { actionsCell, ...rest } = props;

  const t = useTranslations("components.shared.manage-offers-table");
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
      ...(actionsCell
        ? [
            columnHelper.accessor("id", {
              enableSorting: false,
              header: () => null,
              cell: (cell) => actionsCell(cell.row.original),
            }),
          ]
        : []),
    ],
    [entityT, actionsCell, t]
  );

  return (
    <TableWidget {...rest} columns={columns} noDataMessage={t("no-data")} />
  );
};
