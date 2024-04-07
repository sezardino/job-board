"use client";

import { OffersTemplate } from "@/components/templates/Board/Offers/OffersTemplate";
import { useOffersListInfiniteQuery } from "@/hooks/react-query/query/offers/list";

type Props = {
  params: {
    industry: string;
  };
};

const IndustryPage = (props: Props) => {
  const { industry } = props.params;

  const jobOffersQuery = useOffersListInfiniteQuery({ industry });

  return <OffersTemplate offers={jobOffersQuery} />;
};

export default IndustryPage;
