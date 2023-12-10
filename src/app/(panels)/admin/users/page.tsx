"use client";

import { AdminUserManagementTemplate } from "@/components/templates/Admin/AdminUserManagement";
import { useCompaniesUsersQuery } from "@/hooks/react-query/query/users/companies";
import { useTableOnPage } from "@/hooks/use-table-on-page";

const AdminsPage = () => {
  const { limit, onLimitChange, onPageChange, onSearchChange, page, search } =
    useTableOnPage();
  const {
    data: companyUsers,
    isFetching: isCompanyUsersLoading,
    error,
  } = useCompaniesUsersQuery({
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
