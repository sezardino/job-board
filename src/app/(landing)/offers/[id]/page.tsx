"use client";

import { JobOfferTemplate } from "@/components/templates/Board/JobOfferTemplate";
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

  if (!oneOffer) return null;

  return <JobOfferTemplate offer={oneOffer} />;
};

export default OfferPage;
