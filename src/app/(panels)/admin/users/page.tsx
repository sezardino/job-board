"use client";

import { ManageCompanyUsersTemplate } from "@/components/templates/Admin/ManageCompanyUsers/ManageCompanyUsersTemplate";
import { useCompaniesUsersQuery } from "@/hooks/react-query/query/users/companies";
import { useDataOnPage } from "@/hooks/use-data-on-page";

const AdminsPage = () => {
  const { limit, onLimitChange, onPageChange, onSearchChange, page, search } =
    useDataOnPage();
  const { data: companyUsers, isFetching: isCompanyUsersLoading } =
    useCompaniesUsersQuery({
      limit,
      page,
      search,
    });

  return (
    <ManageCompanyUsersTemplate
      data={companyUsers}
      isTableDataLoading={isCompanyUsersLoading}
      onLimitChange={onLimitChange}
      onPageChange={onPageChange}
      onSearchChange={onSearchChange}
    />
  );
};

export default AdminsPage;
