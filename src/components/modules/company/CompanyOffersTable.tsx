import {
  TableWidget,
  TableWidgetProps,
} from "@/components/UI/TableWidget/TableWidget";
import { CurrentCompanyJobOffersResponse } from "@/services/server/modules/job-offers/schema";
import { createColumnHelper } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { useMemo, type ComponentPropsWithoutRef, type FC } from "react";

type Entity = CurrentCompanyJobOffersResponse["data"][number];

type OmittedProps = Omit<TableWidgetProps<Entity>, "columns">;
type Props = {};

export type CompanyOffersTableProps = ComponentPropsWithoutRef<"div"> &
  OmittedProps &
  Props;

const columnHelper = createColumnHelper<Entity>();

export const CompanyOffersTable: FC<CompanyOffersTableProps> = (props) => {
  const { className, ...rest } = props;
  const t = useTranslations("components.company-offers-table");
  const entityT = useTranslations("entity");

  const columns = useMemo(
    () => [
      columnHelper.accessor("name", {
        enableSorting: false,
        header: t("name"),
        cell: (row) => row.getValue(),
      }),
      columnHelper.accessor("status", {
        enableSorting: false,
        header: t("status"),
        cell: (row) => entityT(`job-status.${row.getValue()}`),
      }),
      columnHelper.accessor("seniority", {
        enableSorting: false,
        header: t("seniority"),
        cell: (row) => entityT(`seniority.${row.getValue()}`),
      }),
      columnHelper.accessor("id", {
        enableSorting: false,
        header: () => null,
        cell: (row) => null,
      }),
    ],
    [entityT, t]
  );

  return (
    <TableWidget {...rest} columns={columns} noDataMessage={t("no-data")} />
  );
};
