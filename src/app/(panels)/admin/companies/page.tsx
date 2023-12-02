"use client";

import { useAdminCompaniesListQuery } from "@/hooks/react-query/companies";
import { useTableOnPage } from "@/hooks/use-table-on-page";
import { adminCompaniesListResponseSchema } from "@/services/server/modules/companies/schema/admin-list";

const CompaniesPage = () => {
  const { limit, onLimitChange, onPageChange, onSearchChange, page, search } =
    useTableOnPage();
  const { data: companies, isFetching: isCompaniesLoading } =
    useAdminCompaniesListQuery({ limit, page, search });

  if (companies) {
    console.log(adminCompaniesListResponseSchema.parse(companies));
  }

  return <p>{JSON.stringify(companies?.companies)}</p>;
};

export default CompaniesPage;
