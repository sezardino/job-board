"use client";

import { ManageCompaniesTemplate } from "@/components/templates/Admin/ManageCompaniesTemplate";
import { useAdminCompaniesListQuery } from "@/hooks/react-query/query/companies";
import { useTableOnPage } from "@/hooks/use-table-on-page";

const CompaniesPage = () => {
  const { limit, onLimitChange, onPageChange, onSearchChange, page, search } =
    useTableOnPage();
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
