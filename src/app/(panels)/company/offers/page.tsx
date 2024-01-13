"use client";

import { useDataOnPage } from "@/hooks";
import { useMyCompanyOffersQuery } from "@/hooks/react-query/query/offers";
import { useSession } from "next-auth/react";
import error from "next/error";

const CompanyOffersPage = () => {
  const { data } = useSession();
  const { limit, page, search } = useDataOnPage();

  const {
    data: myCompanyOffers,
    isFetching: isMyCompanyOffersLoading,
    error,
  } = useMyCompanyOffersQuery({
    limit,
    page,
    search,
    companyId: data?.user.companyId!,
  });

  const isLoading = isMyCompanyOffersLoading;

  return JSON.stringify(error);
  return <h1>{JSON.stringify(myCompanyOffers)}</h1>;
};

export default CompanyOffersPage;
