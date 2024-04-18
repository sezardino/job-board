import { DataListProp, DataProp } from "@/types";
import { useTranslations } from "next-intl";
import { useMemo, type FC } from "react";

import { BreadcrumbItem } from "@/components/base/Breadcrumbs/BaseBreadcrumbs";

import {
  OfferFilterSeniority,
  OfferFilterStatus,
} from "@/components/modules/shared/CompanyOffersFilter/CompanyOffersFilter";

import { AdminOffersTemplateWrapper } from "@/components/modules/admin/AdminOffersTemplateWrapper";
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
    <AdminOffersTemplateWrapper
      {...offers}
      title={t("title", { value: category.name })}
      description={t("description")}
      breadcrumbs={breadcrumbs}
      offers={offers}
      statusFilter={statusFilter}
      seniorityFilter={seniorityFilter}
      limit={limit}
      onLimitChange={onLimitChange}
      onPageChange={onPageChange}
      onSearchChange={onSearchChange}
      page={page}
    />
  );
};
