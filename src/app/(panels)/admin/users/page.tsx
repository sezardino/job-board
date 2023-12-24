"use client";

import { AdminUserManagementTemplate } from "@/components/templates/Admin/AdminUserManagement";
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
    <>
      <AdminUserManagementTemplate
        data={companyUsers}
        isTableDataLoading={isCompanyUsersLoading}
        onLimitChange={onLimitChange}
        onPageChange={onPageChange}
        onSearchChange={onSearchChange}
      />
    </>
  );
};

export default AdminsPage;
