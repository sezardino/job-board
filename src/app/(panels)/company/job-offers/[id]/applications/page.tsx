"use client";

import { JobOfferApplicationsTemplate } from "@/components/templates/Company/JobOfferApplications/JobOfferApplicationsTemplate";
import { useJobOfferApplicationsQuery } from "@/hooks";

type Props = {
  params: {
    id: string;
  };
};

const JobOfferApplications = (props: Props) => {
  const { id } = props.params;

  const {
    data: jobOfferApplications,
    isFetching: isJobOfferApplicationsLoading,
  } = useJobOfferApplicationsQuery({ offerId: id });

  return (
    <JobOfferApplicationsTemplate
      applications={{
        data: jobOfferApplications,
        isLoading: isJobOfferApplicationsLoading,
      }}
    />
  );
};

export default JobOfferApplications;
