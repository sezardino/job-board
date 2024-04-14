import { CurrentCompanyOffersResponse } from "@/services/bll/modules/offers/schema";
import { DataListProp, DataProp } from "@/types";
import { useTranslations } from "next-intl";
import { useMemo, type ComponentPropsWithoutRef, type FC } from "react";

import { BreadcrumbItem } from "@/components/base/Breadcrumbs/BaseBreadcrumbs";

import {
  CompanyOffersFilter,
  OfferFilterSeniority,
  OfferFilterStatus,
} from "@/components/modules/shared/CompanyOffersFilter/CompanyOffersFilter";

import { CompanyOffersTable } from "@/components/modules/admin/CompanyOffersTable";
import { PreviewTemplateWrapper } from "@/components/modules/shared/PreviewTemplateWrapper/PreviewTemplateWrapper";
import { AdminPageUrls } from "@/const";

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
    <PreviewTemplateWrapper
      copy={{
        title: t("title", { value: company.name }),
        description: t("description"),
      }}
      breadcrumbs={breadcrumbs}
      search={
        <CompanyOffersFilter
          onSearchChange={onSearchChange}
          seniorityFilter={seniorityFilter}
          statusFilter={statusFilter}
          isAdmin
          className="w-full"
        />
      }
    >
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
    </PreviewTemplateWrapper>
  );
};
