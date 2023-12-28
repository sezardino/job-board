"use client";

import { ManageCompaniesTemplate } from "@/components/templates/Admin/ManageCompaniesTemplate";
import { useAdminCompaniesListQuery } from "@/hooks/react-query/query/companies";
import { useDataOnPage } from "@/hooks/use-data-on-page";

const CompaniesPage = () => {
  const { limit, onLimitChange, onPageChange, onSearchChange, page, search } =
    useDataOnPage();
  const { data: companies, isFetching: isCompaniesLoading } =
    useAdminCompaniesListQuery({ limit, page, search });

  return (
    <ManageCompaniesTemplate
      data={companies}
      isTableDataLoading={isCompaniesLoading}
      onLimitChange={onLimitChange}
      onPageChange={onPageChange}
      onSearchChange={onSearchChange}
    />
  );
};

export default CompaniesPage;
