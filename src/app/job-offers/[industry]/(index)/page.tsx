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

  const {
    data: offersList,
    isFetching: isOffersListLoading,
    fetchNextPage,
    hasNextPage,
  } = useOffersListInfiniteQuery({ industry });

  return (
    <JobOffersTemplate
      offers={{ data: offersList ?? [], isLoading: isOffersListLoading }}
      onTriggerFetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
    />
  );
};

export default IndustryPage;
