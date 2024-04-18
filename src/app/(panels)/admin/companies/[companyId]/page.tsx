"use client";

import {
  OfferFilterSeniority,
  OfferFilterStatus,
} from "@/components/modules/shared/CompanyOffersFilter/CompanyOffersFilter";
import { CompanyOffersTemplate } from "@/components/templates/Admin/CompanyOffers/CompanyOffersTemplate";
import { useCompanyPagesContext } from "@/context";
import { useDataOnPage } from "@/hooks";
import { useOffersForManageQuery } from "@/hooks/react-query/query/offers";
import { useState } from "react";

type Props = {
  params: {
    companyId: string;
  };
};

const CompanyOffersPage = (props: Props) => {
  const {
    params: { companyId },
  } = props;

  const {
    limit,
    page,
    search,
    onLimitChange,
    onPageChange,
    onSearchChange,
    changeHandler,
  } = useDataOnPage();
  const { name } = useCompanyPagesContext();

  const [status, setStatus] = useState<OfferFilterStatus>("all");
  const [seniority, setSeniority] = useState<OfferFilterSeniority>("all");

  const { data: companyOffers, isFetching: isCompanyOffersLoading } =
    useOffersForManageQuery({
      limit,
      page,
      search,
      companyId,
      status: status === "all" ? undefined : status,
      seniority: seniority === "all" ? undefined : seniority,
    });

  return (
    <CompanyOffersTemplate
      company={{ name, id: companyId }}
      offers={{
        data: companyOffers,
        isLoading: isCompanyOffersLoading,
      }}
      limit={limit}
      onLimitChange={onLimitChange}
      onPageChange={onPageChange}
      onSearchChange={onSearchChange}
      page={page}
      search={search}
      statusFilter={{
        value: status,
        onChange: (value) => changeHandler(value, setStatus),
      }}
      seniorityFilter={{
        value: seniority,
        onChange: (value) => changeHandler(value, setSeniority),
      }}
    />
  );
};

export default CompanyOffersPage;
