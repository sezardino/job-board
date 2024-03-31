"use client";

import { JobOffersTemplate } from "@/components/templates/Board/JobOffers/JobOffersTemplate";
import { useOffersListInfiniteQuery } from "@/hooks/react-query/query/job-offers/list";

type Props = {
  params: {
    industry: string;
    category: string;
  };
};

const IndustryPage = (props: Props) => {
  const { industry, category } = props.params;

  const {
    data: offersList,
    isFetching: isOffersListLoading,
    fetchNextPage,
    hasNextPage,
  } = useOffersListInfiniteQuery({ industry, category });

  return (
    <JobOffersTemplate
      offers={{ data: offersList, isLoading: isOffersListLoading }}
      onTriggerFetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
    />
  );
};

export default IndustryPage;
