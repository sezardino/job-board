"use client";

import { CompanyOfferTemplate } from "@/components/templates/Admin/CompanyOffer/CompanyOfferTemplate";
import { useCompanyPagesContext } from "@/context";
import { usePreviewOfferQuery } from "@/hooks/react-query/query/offers";

type Props = {
  params: {
    offerId: string;
    companyId: string;
  };
};

const CompanyOfferPage = (props: Props) => {
  const { offerId } = props.params;
  const { name, id } = useCompanyPagesContext();

  const { data: oneOffer } = usePreviewOfferQuery({
    id: offerId,
    isPreview: true,
  });

  if (!oneOffer) return null;

  return <CompanyOfferTemplate company={{ name, id }} offer={oneOffer} />;
};

export default CompanyOfferPage;
