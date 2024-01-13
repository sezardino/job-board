"use client";

import { useOneOfferQuery } from "@/hooks/react-query/query/offers";

type Props = {
  params: {
    id: string;
  };
};

const OfferPage = (props: Props) => {
  const { id } = props.params;

  const {
    data: oneOffer,
    isFetching: isOneOfferLoading,
    error,
  } = useOneOfferQuery(id);

  return <>{JSON.stringify({ oneOffer, error })}</>;
};

export default OfferPage;
