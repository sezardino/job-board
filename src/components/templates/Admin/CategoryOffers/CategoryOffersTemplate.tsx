import { DataListProp, DataProp } from "@/types";
import { useTranslations } from "next-intl";
import { useMemo, type FC } from "react";

import { BreadcrumbItem } from "@/components/base/Breadcrumbs/BaseBreadcrumbs";

import {
  CompanyOffersFilter,
  OfferFilterSeniority,
  OfferFilterStatus,
} from "@/components/modules/shared/CompanyOffersFilter/CompanyOffersFilter";

import { ManageOffersTable } from "@/components/modules/shared/ManageOffersTable/ManageOffersTable";
import { PreviewTemplateWrapper } from "@/components/modules/shared/PreviewTemplateWrapper/PreviewTemplateWrapper";
import { AdminPageUrls } from "@/const";
import { OffersForManageResponse } from "@/services/bll/modules/offers/schema";

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
  offers: DataProp<OffersForManageResponse>;
  industry: { name: string; id: string };
  category: { name: string; id: string };
};

export type CategoryOffersTemplateProps = Props & DataListProp & OfferFilters;

export const CategoryOffersTemplate: FC<CategoryOffersTemplateProps> = (
  props
) => {
  const {
    industry,
    category,
    statusFilter,
    seniorityFilter,
    limit,
    onLimitChange,
    onPageChange,
    onSearchChange,
    page,
    offers,
  } = props;
  const t = useTranslations("page.admin.category-offers");

  const breadcrumbs = useMemo<BreadcrumbItem[]>(
    () => [
      { label: t("breadcrumbs.home"), href: AdminPageUrls.home },
      { label: industry.name, href: AdminPageUrls.categories(industry.id) },
      { label: category.name },
    ],
    [t, industry.name, industry.id, category.name]
  );

  return (
    <PreviewTemplateWrapper
      copy={{
        title: t("title", { value: category.name }),
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
      <ManageOffersTable
        {...offers}
        data={offers.data?.data || []}
        total={offers.data?.meta.totalPages || 0}
        page={page}
        onPageChange={onPageChange}
        limit={limit}
        onLimitChange={onLimitChange}
      />
    </PreviewTemplateWrapper>
  );
};
