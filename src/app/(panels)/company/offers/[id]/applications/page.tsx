"use client";

import { LoadingOverlay } from "@/components/base/LoadingOverlay/LoadingOverlay";
import { ApplicationStatusFormValues } from "@/components/forms/ApplicationStatus/ApplicationStatusForm";
import { NoteFormValues } from "@/components/forms/NoteForm/NoteForm";
import { OfferApplicationsTemplate } from "@/components/templates/Company/OfferApplications/OfferApplicationsTemplate";
import { useMyCompanyContext } from "@/context";
import { useOfferApplicationsQuery } from "@/hooks";
import { useChangeApplicationStatusMutation } from "@/hooks/react-query/mutation/applications/change-status";
import { useCreateNoteMutation } from "@/hooks/react-query/mutation/notes";
import { useOfferApplicationsStatisticsQuery } from "@/hooks/react-query/query/applications/statistics";
import { useOfferBasicDataQuery } from "@/hooks/react-query/query/offers/basic-data";
import { ApplicationStatus } from "@prisma/client";
import { useCallback, useState } from "react";

type Props = {
  params: {
    id: string;
  };
};

export type OfferApplicationsTypes =
  | "new"
  | "preScreening"
  | "screening"
  | "interview"
  | "offer"
  | "rejected"
  | "canceled";

const OfferApplications = (props: Props) => {
  const { id } = props.params;
  const { name } = useMyCompanyContext();

  const [search, setSearch] = useState("");
  const [activeStatus, setActiveStatus] = useState<ApplicationStatus | null>(
    null
  );

  const offerBasicDataQuery = useOfferBasicDataQuery(id);

  const newApplicationsQuery = useOfferApplicationsQuery(
    {
      offerId: id,
      search,
      status: ApplicationStatus.NEW,
    },
    activeStatus === ApplicationStatus.NEW
  );

  const interviewApplicationsQuery = useOfferApplicationsQuery(
    {
      offerId: id,
      search,
      status: ApplicationStatus.INTERVIEW,
    },
    activeStatus === ApplicationStatus.INTERVIEW
  );
  const offerApplicationsQuery = useOfferApplicationsQuery(
    {
      offerId: id,
      search,
      status: ApplicationStatus.OFFER,
    },
    activeStatus === ApplicationStatus.OFFER
  );
  const preOfferApplicationsQuery = useOfferApplicationsQuery(
    {
      offerId: id,
      search,
      status: ApplicationStatus.PRE_OFFER,
    },
    activeStatus === ApplicationStatus.PRE_OFFER
  );
  const preScreeningApplicationsQuery = useOfferApplicationsQuery(
    {
      offerId: id,
      search,
      status: ApplicationStatus.PRE_SCREENING,
    },
    activeStatus === ApplicationStatus.PRE_SCREENING
  );
  const screeningApplicationsQuery = useOfferApplicationsQuery(
    {
      offerId: id,
      search,
      status: ApplicationStatus.SCREENING,
    },
    activeStatus === ApplicationStatus.SCREENING
  );
  const rejectedApplicationsQuery = useOfferApplicationsQuery(
    {
      offerId: id,
      search,
      status: ApplicationStatus.REJECTED,
    },
    activeStatus === ApplicationStatus.REJECTED
  );

  const statisticsQuery = useOfferApplicationsStatisticsQuery({
    offerId: id,
    search,
  });

  const {
    mutateAsync: changeApplicationStatus,
    isPending: isChangeApplicationStatusLoading,
  } = useChangeApplicationStatusMutation();
  const { mutateAsync: createNote, isPending: isCreateNoteLoading } =
    useCreateNoteMutation();

  const changeApplicationStatusHandler = useCallback(
    async (values: ApplicationStatusFormValues & { applicationId: string }) => {
      if (!activeStatus) return;

      return changeApplicationStatus({
        ...values,
        rejectedReason: values.message,
        offerId: id,
        oldStatus: activeStatus,
      });
    },
    [activeStatus, changeApplicationStatus, id]
  );

  const createNoteHandler = useCallback(
    async (values: NoteFormValues & { applicationId: string }) => {
      if (!activeStatus) return;

      return createNote({
        ...values,
        offerId: id,
        status: activeStatus,
      });
    },
    [activeStatus, createNote, id]
  );

  const isLoading = isChangeApplicationStatusLoading;

  return (
    <>
      {isLoading && <LoadingOverlay />}

      <OfferApplicationsTemplate
        companyName={name}
        offerId={id}
        basicData={offerBasicDataQuery}
        onSearchChange={setSearch}
        activeStatus={activeStatus}
        onStatusChange={setActiveStatus}
        INTERVIEW={interviewApplicationsQuery}
        NEW={newApplicationsQuery}
        PRE_SCREENING={preScreeningApplicationsQuery}
        REJECTED={rejectedApplicationsQuery}
        SCREENING={screeningApplicationsQuery}
        PRE_OFFER={preOfferApplicationsQuery}
        OFFER={offerApplicationsQuery}
        statistics={statisticsQuery}
        changeApplicationStatus={{
          handler: changeApplicationStatusHandler,
          isLoading: isChangeApplicationStatusLoading,
        }}
        createNote={{
          handler: createNoteHandler,
          isLoading: isCreateNoteLoading,
        }}
      />
    </>
  );
};

export default OfferApplications;
