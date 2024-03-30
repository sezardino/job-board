"use client";

import { ManageCompanyJobOffersTemplate } from "@/components/templates/Company/ManageCompanyJobOffers/ManageCompanyJobOffersTemplate";
import { useDataOnPage } from "@/hooks";
import {
  useArchiveJobOfferMutation,
  useFinishJobOfferMutation,
  usePublishJobOfferMutation,
} from "@/hooks/react-query/mutation/job-offer/change-status";
import { useDeleteJobOfferMutation } from "@/hooks/react-query/mutation/job-offer/delete";
import { useCurrentCompanyJobOffersQuery } from "@/hooks/react-query/query/job-offers";
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

  const { mutateAsync: deleteJobOffer, isPending: isDeleteJobOfferLoading } =
    useDeleteJobOfferMutation();
  const { mutateAsync: finishJobOffer, isPending: isFinishJobOfferLoading } =
    useFinishJobOfferMutation();
  const { mutateAsync: archiveJobOffer, isPending: isArchiveJobOfferLoading } =
    useArchiveJobOfferMutation();
  const { mutateAsync: publishJobOffer, isPending: isPublishJobOfferLoading } =
    usePublishJobOfferMutation();

  return (
    <ManageCompanyJobOffersTemplate
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
      deleteAction={{
        handler: deleteJobOffer,
        isLoading: isDeleteJobOfferLoading,
      }}
      finishAction={{
        handler: finishJobOffer,
        isLoading: isFinishJobOfferLoading,
      }}
      archiveAction={{
        handler: archiveJobOffer,
        isLoading: isArchiveJobOfferLoading,
      }}
      publishAction={{
        handler: publishJobOffer,
        isLoading: isPublishJobOfferLoading,
      }}
    />
  );
};

export default CompanyOffersPage;
