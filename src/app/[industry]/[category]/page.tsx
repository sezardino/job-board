"use client";

import { OffersBoardTemplate } from "@/components/templates/Board/OffersBoardTemplate";
import { useOffersListInfiniteQuery } from "@/hooks/react-query/query/offers/list";

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
    <OffersBoardTemplate
      offersList={offersList}
      onTriggerFetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
    />
  );
};

export default IndustryPage;
