"use client";

import {
  OfferFilterSeniority,
  OfferFilterStatus,
} from "@/components/modules/shared/CompanyOffersFilter/CompanyOffersFilter";
import { IndustryOffersTemplate } from "@/components/templates/Admin/IndustryOffers/IndustryOffersTemplate";
import { useOffersForManageQuery } from "@/hooks/react-query/query/offers";
import { useDataOnPage } from "@/hooks/use-data-on-page";
import { useState } from "react";

type Props = {
  params: { industryId: string };
};

const CategoriesPage = (props: Props) => {
  const { industryId } = props.params;

  const [status, setStatus] = useState<OfferFilterStatus>("all");
  const [seniority, setSeniority] = useState<OfferFilterSeniority>("all");
  const { limit, onLimitChange, onPageChange, onSearchChange, page, search } =
    useDataOnPage();
  const offersQuery = useOffersForManageQuery({
    limit,
    page,
    search,
    industryId,
    status: status === "all" ? undefined : status,
    seniority: seniority === "all" ? undefined : seniority,
  });

  return (
    <IndustryOffersTemplate
      industry={{
        name: "test",
        id: industryId,
      }}
      search={search}
      offers={offersQuery}
      limit={limit}
      onLimitChange={onLimitChange}
      onPageChange={onPageChange}
      onSearchChange={onSearchChange}
      page={page}
      statusFilter={{
        value: status,
        onChange: setStatus,
      }}
      seniorityFilter={{
        value: seniority,
        onChange: setSeniority,
      }}
    />
  );
};

export default CategoriesPage;
