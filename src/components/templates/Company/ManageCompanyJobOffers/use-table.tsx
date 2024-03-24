import {
  JobOfferSeniorityFilters,
  JobOfferStatusFilters,
} from "@/app/(panels)/company/offers/page";
import { Button, Icon, Typography } from "@/components/base";
import { SelectOption } from "@/components/base/Select/Select";
import { CurrentCompanyJobOffersResponse } from "@/services/bll/modules/job-offers/schema";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { JobOfferStatus, Seniority } from "@prisma/client";
import { createColumnHelper } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { useMemo } from "react";

import { CompanyPageUrls } from "@/const";
import Link from "next/link";

type Props = {
  onEditJobOffer: (id: string) => void;
};
type Entity = CurrentCompanyJobOffersResponse["data"][number];

const columnHelper = createColumnHelper<Entity>();

export const useCompanyOffersTable = (props: Props) => {
  const { onEditJobOffer } = props;

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
        cell: (row) => entityT(`job-status.${row.getValue()}`),
      }),
      columnHelper.accessor("seniority", {
        enableSorting: false,
        header: t("table.seniority"),
        cell: (row) => entityT(`seniority.${row.getValue()}`),
      }),
      // columnHelper.accessor("deadlineAt", {
      //   enableSorting: false,
      //   header: t("table.deadline"),
      //   cell: (row) =>
      //     row.getValue()
      //       ? dayjs(row.getValue()).format(DEFAULT_DATE_FORMAT)
      //       : "-",
      // }),
      columnHelper.accessor("id", {
        enableSorting: false,
        header: () => null,
        cell: (row) => (
          <Dropdown placement="bottom-end">
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
            <DropdownMenu>
              <DropdownItem
                as={Link}
                href={CompanyPageUrls.offer(row.getValue())}
              >
                <Typography tag="span">{t("table.actions.preview")}</Typography>
              </DropdownItem>
              <DropdownItem onClick={() => onEditJobOffer(row.getValue())}>
                <Typography tag="span">{t("table.actions.edit")}</Typography>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ),
      }),
    ],
    [entityT, onEditJobOffer, t]
  );

  const statusFilterOptions = useMemo<
    SelectOption<JobOfferStatusFilters>[]
  >(() => {
    return [
      {
        id: "all",
        label: t("all"),
      },
      {
        id: JobOfferStatus.ACTIVE,
        label: entityT(`job-status.${JobOfferStatus.ACTIVE}`),
      },
      {
        id: JobOfferStatus.DRAFT,
        label: entityT(`job-status.${JobOfferStatus.DRAFT}`),
      },
      {
        id: JobOfferStatus.INACTIVE,
        label: entityT(`job-status.${JobOfferStatus.INACTIVE}`),
      },
      {
        id: JobOfferStatus.FINISHED,
        label: entityT(`job-status.${JobOfferStatus.FINISHED}`),
      },
      {
        id: JobOfferStatus.ARCHIVED,
        label: entityT(`job-status.${JobOfferStatus.ARCHIVED}`),
      },
    ];
  }, [entityT, t]);

  const seniorityFilterOptions = useMemo<
    SelectOption<JobOfferSeniorityFilters>[]
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
