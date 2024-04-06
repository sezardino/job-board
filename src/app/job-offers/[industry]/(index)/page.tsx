"use client";

import { JobOffersTemplate } from "@/components/templates/Board/JobOffers/JobOffersTemplate";
import { useOffersListInfiniteQuery } from "@/hooks/react-query/query/job-offers/list";

type Props = {
  params: {
    industry: string;
  };
};

const IndustryPage = (props: Props) => {
  const { industry } = props.params;

  const jobOffersQuery = useOffersListInfiniteQuery({ industry });

  return <JobOffersTemplate offers={jobOffersQuery} />;
};

export default IndustryPage;
