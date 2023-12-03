"use client";

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

  return <p>{JSON.stringify(admins?.admins)}</p>;
};

export default AdminsPage;
