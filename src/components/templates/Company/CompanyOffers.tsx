import {
  JobOfferSeniorityFilters,
  JobOfferStatusFilters,
} from "@/app/(panels)/company/offers/page";
import { TitleDescription } from "@/components/UI/TitleDescription/TitleDescription";
import { Button, Grid } from "@/components/base";
import { SearchForm } from "@/components/base/SearchForm/SearchForm";
import { Select, SelectOption } from "@/components/base/Select/Select";
import { CompanyOffersTable } from "@/components/modules/company/CompanyOffersTable";
import { CompanyPageUrls } from "@/const";
import { CurrentCompanyJobOffersResponse } from "@/services/server/modules/job-offers/schema";
import { DataListProp, DataProp } from "@/types";
import { JobOfferStatus, Seniority } from "@prisma/client";
import { useTranslations } from "next-intl";
import { useMemo, type ComponentPropsWithoutRef, type FC } from "react";

import NextLink from "next/link";

type OfferFilters = {
  status: JobOfferStatusFilters;
  seniority: JobOfferSeniorityFilters;
  onStatusChange: (value: JobOfferStatusFilters) => void;
  onSeniorityChange: (value: JobOfferSeniorityFilters) => void;
};

type Props = {
  offers: DataProp<CurrentCompanyJobOffersResponse>;
};

export type CompanyOffersTemplateProps = ComponentPropsWithoutRef<"section"> &
  Props &
  DataListProp &
  OfferFilters;

export const CompanyOffersTemplate: FC<CompanyOffersTemplateProps> = (
  props
) => {
  const {
    limit,
    onLimitChange,
    onPageChange,
    onSearchChange,
    onSeniorityChange,
    onStatusChange,
    page,
    search,
    seniority,
    status,
    offers,
    className,
    ...rest
  } = props;
  const t = useTranslations("components.company-offers-template");
  const entityT = useTranslations("entity");

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

  return (
    <Grid tag="section" gap={4} {...rest}>
      <Grid tag="header" gap={2}>
        <TitleDescription
          title={t("title")}
          titleLevel="h1"
          description={t("description")}
        />
        <div className="flex gap-3 items-center justify-between">
          <div className="flex-grow flex flex-wrap gap-3 items-center">
            <SearchForm placeholder={t("search")} onSearch={onSearchChange} />

            <Select
              options={statusFilterOptions}
              value={status}
              onSelectChange={onStatusChange}
              placeholder={t("filters.status")}
              className="max-w-[220px]"
            />
            <Select
              options={seniorityFilterOptions}
              value={seniority}
              onSelectChange={onSeniorityChange}
              placeholder={t("filters.seniority")}
              className="max-w-[220px]"
            />
          </div>
          <Button as={NextLink} href={CompanyPageUrls.newOffer} color="primary">
            {t("create")}
          </Button>
        </div>
      </Grid>
      <CompanyOffersTable
        {...offers}
        data={offers.data?.data || []}
        total={offers.data?.meta.totalPages || 0}
        page={page}
        onPageChange={onPageChange}
        limit={limit}
        onLimitChange={onLimitChange}
      />
    </Grid>
  );
};
