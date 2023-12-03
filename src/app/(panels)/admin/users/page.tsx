"use client";

import { useCompanyUsersQuery } from "@/hooks/react-query/query/users/companies";
import { useTableOnPage } from "@/hooks/use-table-on-page";

const AdminsPage = () => {
  const { limit, onLimitChange, onPageChange, onSearchChange, page, search } =
    useTableOnPage();
  const { data: admins, isFetching: isAdminsLoading } = useCompanyUsersQuery({
    limit,
    page,
    search,
  });

  return <p>{JSON.stringify(admins?.users)}</p>;
};

export default AdminsPage;
