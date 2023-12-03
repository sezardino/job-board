"use client";

import { useAdminCompaniesListQuery } from "@/hooks/react-query/query/companies";
import { useTableOnPage } from "@/hooks/use-table-on-page";

const CompaniesPage = () => {
  const { limit, onLimitChange, onPageChange, onSearchChange, page, search } =
    useTableOnPage();
  const { data: companies, isFetching: isCompaniesLoading } =
    useAdminCompaniesListQuery({ limit, page, search });

  return <p>{JSON.stringify(companies?.companies)}</p>;
};

export default CompaniesPage;
