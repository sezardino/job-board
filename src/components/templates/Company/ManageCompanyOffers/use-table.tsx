import {
  OfferSeniorityFilters,
  OfferStatusFilters,
} from "@/app/(panels)/company/offers/page";
import { SelectOption } from "@/components/base/Select/Select";
import { CurrentCompanyOffersResponse } from "@/services/bll/modules/offers/schema";

import { OfferStatus, Seniority } from "@prisma/client";
import { createColumnHelper } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { useMemo } from "react";

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

export type ManageCompanyOffersTableAction = {
  type: "edit" | "delete" | "finish" | "archive" | "publish";
  id: string;
};

type Props = {
  onAction: (action: ManageCompanyOffersTableAction) => void;
};

type Entity = CurrentCompanyOffersResponse["data"][number];

const columnHelper = createColumnHelper<Entity>();

export const useCompanyOffersTable = (props: Props) => {
  const { onAction } = props;

  const t = useTranslations("components.manage-company-job-offers-template");
  const entityT = useTranslations("entity");

  const columns = useMemo(
    () => [
      columnHelper.accessor("name", {
        enableSorting: false,
        header: t("table.name"),
        cell: (row) => row.getValue(),
      }),
      columnHelper.accessor("industry.name", {
        enableSorting: false,
        header: t("table.industry-category"),
        cell: (row) => (
          <Typography tag="p">
            {entityT(`industries.${row.getValue()}`)} {" / "}
            {entityT(`categories.${row.row.original.category.name}`)}
          </Typography>
        ),
      }),
      columnHelper.accessor("status", {
        enableSorting: false,
        header: t("table.status"),
        cell: (row) => entityT(`offers.status.${row.getValue()}`),
      }),
      columnHelper.accessor("seniority", {
        enableSorting: false,
        header: t("table.seniority"),
        cell: (row) => entityT(`offers.seniority.${row.getValue()}`),
      }),
      // columnHelper.accessor("deadlineAt", {
      //   enableSorting: false,
      //   header: t("table.deadline"),
      //   cell: (row) =>
      //     row.getValue()
      //       ? dayjs(row.getValue()).format(DEFAULT_DATE_FORMAT)
      //       : "-",
      // }),
      columnHelper.accessor("_count.applications", {
        enableSorting: false,
        header: t("table.applications-count"),
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
              text: t("table.actions.preview"),
            },
            {
              key: "edit",
              text: t("table.actions.edit"),
              onClick: () => onAction({ type: "edit", id: row.getValue() }),
            },
            {
              key: "applications",
              text: t("table.actions.applications"),
              to: CompanyPageUrls.applications(row.getValue()),
            },
          ];

          if (status === OfferStatus.DRAFT) {
            items.push({
              key: "publish",
              text: t("table.actions.publish"),
              onClick: () => onAction({ type: "publish", id: row.getValue() }),
            });
          }

          if (status === OfferStatus.ACTIVE) {
            items.push({
              key: "finish",
              text: t("table.actions.finish"),
              onClick: () => onAction({ type: "finish", id: row.getValue() }),
            });
          }

          if (status === OfferStatus.FINISHED) {
            items.push({
              key: "archive",
              text: t("table.actions.archive"),
              onClick: () => onAction({ type: "archive", id: row.getValue() }),
            });
          }

          if (status !== OfferStatus.INACTIVE) {
            items.push({
              key: "delete",
              text: t("table.actions.delete"),
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
                  tooltip={t("table.actions.label")}
                  isIconOnly
                >
                  <Icon name="HiDotsHorizontal" />
                </Button>
              </DropdownTrigger>
            </Dropdown>
          );
        },
      }),
    ],
    [entityT, onAction, t]
  );

  const statusFilterOptions = useMemo<
    SelectOption<OfferStatusFilters>[]
  >(() => {
    return [
      {
        id: OfferStatus.ACTIVE,
        label: entityT(`offers.status.${OfferStatus.ACTIVE}`),
      },
      {
        id: OfferStatus.DRAFT,
        label: entityT(`offers.status.${OfferStatus.DRAFT}`),
      },

      {
        id: OfferStatus.FINISHED,
        label: entityT(`offers.status.${OfferStatus.FINISHED}`),
      },
      {
        id: OfferStatus.ARCHIVED,
        label: entityT(`offers.status.${OfferStatus.ARCHIVED}`),
      },
    ];
  }, [entityT]);

  const seniorityFilterOptions = useMemo<
    SelectOption<OfferSeniorityFilters>[]
  >(() => {
    return [
      {
        id: "all",
        label: t("all"),
      },
      {
        id: Seniority.INTERN,
        label: entityT(`seniority.${Seniority.INTERN}`),
      },
      {
        id: Seniority.JUNIOR,
        label: entityT(`seniority.${Seniority.JUNIOR}`),
      },
      {
        id: Seniority.MID,
        label: entityT(`seniority.${Seniority.MID}`),
      },
      {
        id: Seniority.SENIOR,
        label: entityT(`seniority.${Seniority.SENIOR}`),
      },
      {
        id: Seniority.EXPERT,
        label: entityT(`seniority.${Seniority.EXPERT}`),
      },
    ];
  }, [entityT, t]);

  return {
    columns,
    statusFilterOptions,
    seniorityFilterOptions,
  };
};
