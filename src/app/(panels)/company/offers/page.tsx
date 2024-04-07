"use client";

import { ManageCompanyOffersTemplate } from "@/components/templates/Company/ManageCompanyOffers/ManageCompanyOffersTemplate";
import { useDataOnPage } from "@/hooks";
import {
  useArchiveOfferMutation,
  useFinishOfferMutation,
  usePublishOfferMutation,
} from "@/hooks/react-query/mutation/offers/change-status";
import { useDeleteOfferMutation } from "@/hooks/react-query/mutation/offers/delete";
import { useCurrentCompanyOffersQuery } from "@/hooks/react-query/query/offers";
import { OfferStatus, Seniority } from "@prisma/client";
import { useState } from "react";

export type OfferStatusFilters = Exclude<OfferStatus, "INACTIVE">;
export type OfferSeniorityFilters = Seniority | "all";

const CompanyOffersPage = () => {
  const {
    limit,
    page,
    search,
    onLimitChange,
    onPageChange,
    onSearchChange,
    changeHandler,
  } = useDataOnPage();

  const [status, setStatus] = useState<OfferStatusFilters>(OfferStatus.ACTIVE);
  const [seniority, setSeniority] = useState<OfferSeniorityFilters>("all");

  const { data: companyOffers, isFetching: isCompanyOffersLoading } =
    useCurrentCompanyOffersQuery({
      limit,
      page,
      search,
      status: status,
      seniority: seniority === "all" ? undefined : seniority,
    });

  const { mutateAsync: deleteOffer, isPending: isDeleteOfferLoading } =
    useDeleteOfferMutation();
  const { mutateAsync: finishOffer, isPending: isFinishOfferLoading } =
    useFinishOfferMutation();
  const { mutateAsync: archiveOffer, isPending: isArchiveOfferLoading } =
    useArchiveOfferMutation();
  const { mutateAsync: publishOffer, isPending: isPublishOfferLoading } =
    usePublishOfferMutation();

  return (
    <ManageCompanyOffersTemplate
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
        handler: deleteOffer,
        isLoading: isDeleteOfferLoading,
      }}
      finishAction={{
        handler: finishOffer,
        isLoading: isFinishOfferLoading,
      }}
      archiveAction={{
        handler: archiveOffer,
        isLoading: isArchiveOfferLoading,
      }}
      publishAction={{
        handler: publishOffer,
        isLoading: isPublishOfferLoading,
      }}
    />
  );
};

export default CompanyOffersPage;
