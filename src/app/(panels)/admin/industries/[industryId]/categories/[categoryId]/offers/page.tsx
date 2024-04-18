"use client";

import {
  OfferFilterSeniority,
  OfferFilterStatus,
} from "@/components/modules/shared/CompanyOffersFilter/CompanyOffersFilter";
import { CategoryOffersTemplate } from "@/components/templates/Admin/CategoryOffers/CategoryOffersTemplate";
import { useCategoryPagesContext, useIndustryPagesContext } from "@/context";
import { useOffersForManageQuery } from "@/hooks/react-query/query/offers";
import { useDataOnPage } from "@/hooks/use-data-on-page";
import { useState } from "react";

type Props = {
  params: { industryId: string; categoryId: string };
};

const CategoriesPage = (props: Props) => {
  const { industryId, categoryId } = props.params;
  const category = useCategoryPagesContext();
  const industry = useIndustryPagesContext();

  const [status, setStatus] = useState<OfferFilterStatus>("all");
  const [seniority, setSeniority] = useState<OfferFilterSeniority>("all");

  const { limit, onLimitChange, onPageChange, onSearchChange, page, search } =
    useDataOnPage();
  const offersQuery = useOffersForManageQuery({
    limit,
    page,
    search,
    industryId,
    categoryId,
    seniority: seniority === "all" ? undefined : seniority,
    status: status === "all" ? undefined : status,
  });

  return (
    <CategoryOffersTemplate
      offers={offersQuery}
      category={category}
      industry={industry}
      onLimitChange={onLimitChange}
      onPageChange={onPageChange}
      onSearchChange={onSearchChange}
      limit={limit}
      page={page}
      seniorityFilter={{ value: seniority, onChange: setSeniority }}
      statusFilter={{ value: status, onChange: setStatus }}
      search={search}
    />
  );
};

export default CategoriesPage;
