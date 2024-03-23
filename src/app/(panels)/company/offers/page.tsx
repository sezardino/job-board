"use client";

import { ManageCompanyJobOffers } from "@/components/templates/Company/ManageCompanyJobOffers/ManageCompanyJobOffers";
import { useDataOnPage } from "@/hooks";
import { useCurrentCompanyJobOffersQuery } from "@/hooks/react-query/query/offers";
import { JobOfferStatus, Seniority } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useState } from "react";

export type JobOfferStatusFilters = JobOfferStatus | "all";
export type JobOfferSeniorityFilters = Seniority | "all";

const CompanyOffersPage = () => {
  const { data } = useSession();
  const {
    limit,
    page,
    search,
    onLimitChange,
    onPageChange,
    onSearchChange,
    changeHandler,
  } = useDataOnPage();

  const [status, setStatus] = useState<JobOfferStatusFilters>("all");
  const [seniority, setSeniority] = useState<JobOfferSeniorityFilters>("all");

  const { data: companyOffers, isFetching: isCompanyOffersLoading } =
    useCurrentCompanyJobOffersQuery({
      limit,
      page,
      search,
      status: status === "all" ? undefined : status,
      seniority: seniority === "all" ? undefined : seniority,
    });

  return (
    <ManageCompanyJobOffers
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
      status={status}
      seniority="all"
      onStatusChange={(value) => changeHandler(value, setStatus)}
      onSeniorityChange={(value) => changeHandler(value, setSeniority)}
    />
  );
};

export default CompanyOffersPage;
