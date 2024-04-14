import { CurrentCompanyOffersResponse } from "@/services/bll/modules/offers/schema";

import { OfferStatus } from "@prisma/client";
import { createColumnHelper } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { FC, useMemo } from "react";

import {
  TableWidget,
  TableWidgetProps,
} from "@/components/UI/TableWidget/TableWidget";
import { Button } from "@/components/base/Button/Button";
import {
  Dropdown,
  DropdownItemProps,
} from "@/components/base/Dropdown/Dropdown";
import { Icon } from "@/components/base/Icon/Icon";
import { Typography } from "@/components/base/Typography/Typography";
import { CompanyPageUrls } from "@/const";
import { DropdownTrigger } from "@nextui-org/react";
import Link from "next/link";

type Offer = CurrentCompanyOffersResponse["data"][number];

export type ManageManageOffersTableAction = {
  type: "edit" | "delete" | "finish" | "archive" | "publish";
  id: string;
};

type Props = {
  onAction: (action: ManageManageOffersTableAction) => void;
};

type OmittedProps = Omit<TableWidgetProps<Offer>, "columns">;

export type ManageOffersTableProps = OmittedProps & Props;

const columnHelper = createColumnHelper<Offer>();

export const ManageOffersTable: FC<ManageOffersTableProps> = (props) => {
  const { onAction, ...rest } = props;

  const t = useTranslations("components.offers-table");
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
        cell: (row) => {
          const status = row.row.original.status;

          const items: DropdownItemProps[] = [
            {
              key: "preview",
              as: Link,
              to: CompanyPageUrls.offer(row.getValue()),
              text: t("actions.preview"),
            },
            {
              key: "applications",
              text: t("actions.applications"),
              to: CompanyPageUrls.applications(row.getValue()),
            },
          ];

          items.push({
            key: "edit",
            text: t("actions.edit"),
            onClick: () => onAction({ type: "edit", id: row.getValue() }),
          });

          if (status === OfferStatus.DRAFT) {
            items.push({
              key: "publish",
              text: t("actions.publish"),
              onClick: () => onAction({ type: "publish", id: row.getValue() }),
            });
          }

          if (status === OfferStatus.ACTIVE) {
            items.push({
              key: "finish",
              text: t("actions.finish"),
              onClick: () => onAction({ type: "finish", id: row.getValue() }),
            });
          }

          if (status === OfferStatus.FINISHED) {
            items.push({
              key: "archive",
              text: t("actions.archive"),
              onClick: () => onAction({ type: "archive", id: row.getValue() }),
            });
          }

          if (status !== OfferStatus.INACTIVE) {
            items.push({
              key: "delete",
              text: t("actions.delete"),
              color: "danger",
              onClick: () => onAction({ type: "delete", id: row.getValue() }),
            });
          }

          const disabledKeys = [];

          if (
            status === OfferStatus.INACTIVE ||
            status === OfferStatus.FINISHED ||
            status === OfferStatus.ARCHIVED
          ) {
            disabledKeys.push("edit");
          }

          return (
            <Dropdown
              placement="bottom-end"
              label="Actions dropdown"
              items={items}
              disabledKeys={["edit"]}
            >
              <DropdownTrigger>
                <Button
                  variant="light"
                  color="default"
                  text={t("actions.label")}
                  isIconOnly
                  endContent={<Icon name="HiDotsHorizontal" />}
                />
              </DropdownTrigger>
            </Dropdown>
          );
        },
      }),
    ],
    [entityT, onAction, t]
  );

  return (
    <TableWidget {...rest} columns={columns} noDataMessage={t("no-data")} />
  );
};
