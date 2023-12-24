"use client";

import { useMyCompanyOffersQuery } from "@/hooks/react-query/query/offers";

const CompanyOffersPage = () => {
  const { data: myCompanyOffers, isFetching: isMyCompanyOffersLoading } =
    useMyCompanyOffersQuery({});

  const isLoading = isMyCompanyOffersLoading;

  return <h1>{JSON.stringify(myCompanyOffers)}</h1>;
};

export default CompanyOffersPage;
