import { TitleDescription } from "@/components/UI/TitleDescription/TitleDescription";
import { CurrentCompanyOffersResponse } from "@/services/bll/modules/offers/schema";
import { DataListProp, DataProp } from "@/types";
import { useTranslations } from "next-intl";
import { useMemo, type ComponentPropsWithoutRef, type FC } from "react";

import {
  BaseBreadcrumbs,
  BreadcrumbItem,
} from "@/components/base/Breadcrumbs/BaseBreadcrumbs";
import { Grid } from "@/components/base/Grid/Grid";

import {
  CompanyOffersFilter,
  OfferFilterSeniority,
  OfferFilterStatus,
} from "@/components/modules/shared/CompanyOffersFilter/CompanyOffersFilter";

import { CompanyOffersTable } from "@/components/modules/admin/CompanyOffersTable";
import { AdminPageUrls } from "@/const";
import styles from "./CompanyOffersTemplate.module.scss";

type OfferFilters = {
  statusFilter: {
    value: OfferFilterStatus;
    onChange: (value: OfferFilterStatus) => void;
  };
  seniorityFilter: {
    value: OfferFilterSeniority;
    onChange: (value: OfferFilterSeniority) => void;
  };
};

type Props = {
  offers: DataProp<CurrentCompanyOffersResponse>;
  company: { name: string; id: string };
};

export type CompanyOffersTemplateProps = ComponentPropsWithoutRef<"section"> &
  Props &
  DataListProp &
  OfferFilters;

export const CompanyOffersTemplate: FC<CompanyOffersTemplateProps> = (
  props
) => {
  const {
    statusFilter,
    seniorityFilter,
    limit,
    onLimitChange,
    onPageChange,
    onSearchChange,
    page,
    search,
    offers,
    company,
    className,
    ...rest
  } = props;
  const t = useTranslations("page.admin.company-offers");

  const breadcrumbs = useMemo<BreadcrumbItem[]>(
    () => [
      { label: t("breadcrumbs.companies"), href: AdminPageUrls.companies },
      { label: company.name },
    ],
    [t, company.name]
  );

  return (
    <>
      <Grid tag="section" gap={4} {...rest}>
        <Grid tag="header" gap={3}>
          <TitleDescription
            title={t("title", { value: company.name })}
            titleLevel="h1"
            description={t("description")}
          />

          <BaseBreadcrumbs items={breadcrumbs} className={styles.breadcrumbs} />

          <CompanyOffersFilter
            onSearchChange={onSearchChange}
            seniorityFilter={seniorityFilter}
            statusFilter={statusFilter}
            isAdmin
          />
        </Grid>

        <CompanyOffersTable
          {...offers}
          data={offers.data?.data || []}
          total={offers.data?.meta.totalPages || 0}
          page={page}
          onPageChange={onPageChange}
          limit={limit}
          onLimitChange={onLimitChange}
          companyId={company.id}
        />
      </Grid>
    </>
  );
};
