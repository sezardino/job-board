"use client";

import { useMyCompanyQuery } from "@/hooks";

const CompanyHomePage = () => {
  const { data: myCompany, isFetching: isMyCompanyLoading } =
    useMyCompanyQuery();

  return <>{JSON.stringify(myCompany)}</>;
};

export default CompanyHomePage;
