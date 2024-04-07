"use client";

import { JobOfferApplicationsTemplate } from "@/components/templates/Company/JobOfferApplications/JobOfferApplicationsTemplate";
import { useJobOfferApplicationsQuery } from "@/hooks";
import { useJobOfferApplicationsStatisticsQuery } from "@/hooks/react-query/query/job-applications/statistics";
import { JobApplicationStatus } from "@prisma/client";
import { useState } from "react";

type Props = {
  params: {
    id: string;
  };
};

export type JobOfferApplicationsTypes =
  | "new"
  | "preScreening"
  | "screening"
  | "interview"
  | "offer"
  | "rejected"
  | "canceled";

const JobOfferApplications = (props: Props) => {
  const { id } = props.params;
  const [search, setSearch] = useState("");
  const [activeStatus, setActiveStatus] = useState<JobApplicationStatus | null>(
    null
  );

  const newApplicationsQuery = useJobOfferApplicationsQuery(
    {
      offerId: id,
      search,
      status: JobApplicationStatus.NEW,
    },
    activeStatus === JobApplicationStatus.NEW
  );
  const canceledApplicationsQuery = useJobOfferApplicationsQuery(
    {
      offerId: id,
      search,
      status: JobApplicationStatus.CANCELED,
    },
    activeStatus === JobApplicationStatus.CANCELED
  );
  const interviewApplicationsQuery = useJobOfferApplicationsQuery(
    {
      offerId: id,
      search,
      status: JobApplicationStatus.INTERVIEW,
    },
    activeStatus === JobApplicationStatus.INTERVIEW
  );
  const offerApplicationsQuery = useJobOfferApplicationsQuery(
    {
      offerId: id,
      search,
      status: JobApplicationStatus.OFFER,
    },
    activeStatus === JobApplicationStatus.OFFER
  );
  const preOfferApplicationsQuery = useJobOfferApplicationsQuery(
    {
      offerId: id,
      search,
      status: JobApplicationStatus.PRE_OFFER,
    },
    activeStatus === JobApplicationStatus.PRE_OFFER
  );
  const preScreeningApplicationsQuery = useJobOfferApplicationsQuery(
    {
      offerId: id,
      search,
      status: JobApplicationStatus.PRE_SCREENING,
    },
    activeStatus === JobApplicationStatus.PRE_SCREENING
  );
  const screeningApplicationsQuery = useJobOfferApplicationsQuery(
    {
      offerId: id,
      search,
      status: JobApplicationStatus.SCREENING,
    },
    activeStatus === JobApplicationStatus.SCREENING
  );
  const rejectedApplicationsQuery = useJobOfferApplicationsQuery(
    {
      offerId: id,
      search,
      status: JobApplicationStatus.REJECTED,
    },
    activeStatus === JobApplicationStatus.REJECTED
  );

  const statisticsQuery = useJobOfferApplicationsStatisticsQuery({
    offerId: id,
    search,
  });

  return (
    <JobOfferApplicationsTemplate
      onSearchChange={setSearch}
      activeStatus={activeStatus}
      onStatusChange={setActiveStatus}
      CANCELED={canceledApplicationsQuery}
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

export default JobOfferApplications;
