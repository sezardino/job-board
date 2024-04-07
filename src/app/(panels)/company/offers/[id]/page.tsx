"use client";

import { ManageOfferTemplate } from "@/components/templates/Company/ManageOffer/ManageOfferTemplate";
import { useMyCompanyContext } from "@/context";
import { usePreviewOfferQuery } from "@/hooks/react-query/query/offers";

type Props = {
  params: {
    id: string;
  };
};

const OfferPage = (props: Props) => {
  const { id } = props.params;
  const { name } = useMyCompanyContext();

  const { data: oneOffer } = usePreviewOfferQuery({ id, isPreview: true });

  if (!oneOffer) return null;

  return <ManageOfferTemplate companyName={name} offer={oneOffer} />;
};

export default OfferPage;
