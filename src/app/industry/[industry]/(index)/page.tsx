"use client";

import { OffersBoardTemplate } from "@/components/templates/Board/OffersBoardTemplate";
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
    <OffersBoardTemplate
      offersList={offersList}
      onTriggerFetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
    />
  );
};

export default IndustryPage;
