"use client";

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
    <div>
      <h1>Applications</h1>
      {JSON.stringify({ jobOfferApplications })}
    </div>
  );
};

export default JobOfferApplications;
