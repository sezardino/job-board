"use client";

import {
  OfferFilterSeniority,
  OfferFilterStatus,
} from "@/components/modules/shared/CompanyOffersFilter/CompanyOffersFilter";
import { ManageOffersTemplate } from "@/components/templates/Company/ManageOffers/ManageOffersTemplate";
import { useDataOnPage } from "@/hooks";
import {
  useArchiveOfferMutation,
  useFinishOfferMutation,
  usePublishOfferMutation,
} from "@/hooks/react-query/mutation/offers/change-status";
import { useDeleteOfferMutation } from "@/hooks/react-query/mutation/offers/delete";
import { useOffersForManageQuery } from "@/hooks/react-query/query/offers";
import { useState } from "react";

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

  const [status, setStatus] = useState<OfferFilterStatus>("all");
  const [seniority, setSeniority] = useState<OfferFilterSeniority>("all");

  const { data: companyOffers, isFetching: isCompanyOffersLoading } =
    useOffersForManageQuery({
      limit,
      page,
      search,
      status: status === "all" ? undefined : status,
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
    <ManageOffersTemplate
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
