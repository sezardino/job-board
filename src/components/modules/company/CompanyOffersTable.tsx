import {
  TableWidget,
  TableWidgetProps,
} from "@/components/UI/TableWidget/TableWidget";
import { Button, Icon } from "@/components/base";
import { Dropdown } from "@/components/base/Dropdown/Dropdown";
import { DEFAULT_DATE_FORMAT } from "@/const";
import { CurrentCompanyJobOffersResponse } from "@/services/server/modules/job-offers/schema";
import { JobOfferStatus } from "@prisma/client";
import { createColumnHelper } from "@tanstack/react-table";
import dayjs from "dayjs";
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
      columnHelper.accessor("industry.name", {
        enableSorting: false,
        header: t("industry"),
        cell: (row) => entityT(`industries.${row.getValue()}`),
      }),
      columnHelper.accessor("category.name", {
        enableSorting: false,
        header: t("category"),
        cell: (row) => entityT(`categories.${row.getValue()}`),
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
      columnHelper.accessor("deadlineAt", {
        enableSorting: false,
        header: t("deadline"),
        cell: (row) =>
          row.getValue()
            ? dayjs(row.getValue()).format(DEFAULT_DATE_FORMAT)
            : "-",
      }),
      columnHelper.accessor("id", {
        enableSorting: false,
        header: () => null,
        cell: (row) => (
          <Dropdown
            items={[
              { label: t("actions.details") },
              {
                label: t("actions.edit.label"),
                disabled: row.row.original.status !== JobOfferStatus.DRAFT,
                tooltip:
                  row.row.original.status !== JobOfferStatus.DRAFT
                    ? t("actions.edit.wrong-status")
                    : undefined,
              },
              {
                label: t("actions.publish.label"),
                disabled: row.row.original.status !== JobOfferStatus.DRAFT,
                tooltip: "123",
                // tooltip:
                //   row.row.original.status !== JobOfferStatus.DRAFT
                //     ? t("actions.publish.unpublish")
                //     : undefined,
              },
              {
                label: t("actions.archive.label"),
                disabled: true,
                onClick: () => console.log("archive"),
                tooltip: "123",
                // tooltip:
                //   row.row.original.status !== JobOfferStatus.DRAFT
                //     ? t("actions.archive.wrong-status")
                //     : undefined,
              },
            ]}
            aria-label={t("actions.label")}
          >
            <Button variant="light">
              <Icon name="HiDotsVertical" />
            </Button>
          </Dropdown>
        ),
      }),
    ],
    [entityT, t]
  );

  return (
    <TableWidget {...rest} columns={columns} noDataMessage={t("no-data")} />
  );
};
