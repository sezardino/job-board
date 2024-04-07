"use client";

import { OfferApplicationsTemplate } from "@/components/templates/Company/OfferApplications/OfferApplicationsTemplate";
import { useOfferApplicationsQuery } from "@/hooks";
import { useOfferApplicationsStatisticsQuery } from "@/hooks/react-query/query/applications/statistics";
import { ApplicationStatus } from "@prisma/client";
import { useState } from "react";

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
  const [search, setSearch] = useState("");
  const [activeStatus, setActiveStatus] = useState<ApplicationStatus | null>(
    null
  );

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

  return (
    <OfferApplicationsTemplate
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
    />
  );
};

export default OfferApplications;