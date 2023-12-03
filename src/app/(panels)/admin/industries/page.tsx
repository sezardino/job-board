"use client";

import { useAdminIndustriesListQuery } from "@/hooks/react-query/query/industries";
import { useTableOnPage } from "@/hooks/use-table-on-page";

const IndustriesPage = () => {
  const { limit, onLimitChange, onPageChange, onSearchChange, page, search } =
    useTableOnPage();
  const { data: industries, isFetching: isIndustriesLoading } =
    useAdminIndustriesListQuery({ limit, page, search });

  return <p>{JSON.stringify(industries?.industries)}</p>;
};

export default IndustriesPage;
