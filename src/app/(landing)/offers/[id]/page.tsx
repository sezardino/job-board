"use client";

import { JobOfferTemplate } from "@/components/templates/Board/JobOfferTemplate/JobOfferTemplate";
import { usePreviewJobOfferQuery } from "@/hooks/react-query/query/job-offers";

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
  } = usePreviewJobOfferQuery({ id });

  if (!oneOffer) return null;

  return <JobOfferTemplate offer={oneOffer} />;
};

export default OfferPage;
