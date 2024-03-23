"use client";

import { ManageJobOfferTemplate } from "@/components/templates/Company/ManageJobOffer/ManageJobOfferTemplate";
import { usePreviewJobOfferQuery } from "@/hooks/react-query/query/offers";

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
  } = usePreviewJobOfferQuery({ id, isPreview: true });

  if (!oneOffer) return null;

  return <ManageJobOfferTemplate offer={oneOffer} />;
};

export default OfferPage;