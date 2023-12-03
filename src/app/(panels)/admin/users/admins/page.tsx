"use client";

import { ManageAdminsTemplate } from "@/components/templates/ManageAdminsTemplate";
import { useAdminsListQuery } from "@/hooks/react-query/query/users";
import { useTableOnPage } from "@/hooks/use-table-on-page";

const AdminsPage = () => {
  const { limit, onLimitChange, onPageChange, onSearchChange, page, search } =
    useTableOnPage();
  const { data: admins, isFetching: isAdminsLoading } = useAdminsListQuery({
    limit,
    page,
    search,
  });

  return (
    <ManageAdminsTemplate
      data={admins}
      isTableDataLoading={isAdminsLoading}
      onLimitChange={onLimitChange}
      onPageChange={onPageChange}
    />
  );
};

export default AdminsPage;
