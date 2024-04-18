"use client";

import { CompanyOfferApplicationsTemplate } from "@/components/templates/Admin/CompanyOfferApplications/CompanyOfferApplicationsTemplate";
import { useCompanyPagesContext } from "@/context";
import { useOfferApplicationsQuery } from "@/hooks";
import { useOfferApplicationsStatisticsQuery } from "@/hooks/react-query/query/applications/statistics";
import { useOfferBasicDataQuery } from "@/hooks/react-query/query/offers/basic-data";
import { ApplicationStatus } from "@prisma/client";
import { useState } from "react";

type Props = {
  params: {
    companyId: string;
    offerId: string;
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

const OfferApplicationsPage = (props: Props) => {
  const { companyId, offerId } = props.params;
  const { name } = useCompanyPagesContext();

  const [search, setSearch] = useState("");
  const [activeStatus, setActiveStatus] = useState<ApplicationStatus | null>(
    null
  );

  const offerBasicDataQuery = useOfferBasicDataQuery({ offerId, companyId });

  const newApplicationsQuery = useOfferApplicationsQuery(
    {
      offerId,
      search,
      status: ApplicationStatus.NEW,
    },
    activeStatus === ApplicationStatus.NEW
  );
  const interviewApplicationsQuery = useOfferApplicationsQuery(
    {
      offerId,
      search,
      status: ApplicationStatus.INTERVIEW,
    },
    activeStatus === ApplicationStatus.INTERVIEW
  );
  const offerApplicationsQuery = useOfferApplicationsQuery(
    {
      offerId,
      search,
      status: ApplicationStatus.OFFER,
    },
    activeStatus === ApplicationStatus.OFFER
  );
  const preOfferApplicationsQuery = useOfferApplicationsQuery(
    {
      offerId,
      search,
      status: ApplicationStatus.PRE_OFFER,
    },
    activeStatus === ApplicationStatus.PRE_OFFER
  );
  const preScreeningApplicationsQuery = useOfferApplicationsQuery(
    {
      offerId,
      search,
      status: ApplicationStatus.PRE_SCREENING,
    },
    activeStatus === ApplicationStatus.PRE_SCREENING
  );
  const screeningApplicationsQuery = useOfferApplicationsQuery(
    {
      offerId,
      search,
      status: ApplicationStatus.SCREENING,
    },
    activeStatus === ApplicationStatus.SCREENING
  );
  const rejectedApplicationsQuery = useOfferApplicationsQuery(
    {
      offerId,
      search,
      status: ApplicationStatus.REJECTED,
    },
    activeStatus === ApplicationStatus.REJECTED
  );

  const statisticsQuery = useOfferApplicationsStatisticsQuery({
    offerId,
    search,
  });

  return (
    <CompanyOfferApplicationsTemplate
      company={{ name, id: companyId }}
      offerId={offerId}
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
    />
  );
};

export default OfferApplicationsPage;
