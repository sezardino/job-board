"use client";

import { ManageIndustriesTemplate } from "@/components/templates/ManageIndustriesTemplate";
import { useAdminIndustriesListQuery } from "@/hooks/react-query/query/industries";
import { useTableOnPage } from "@/hooks/use-table-on-page";

const IndustriesPage = () => {
  const { limit, onLimitChange, onPageChange, onSearchChange, page, search } =
    useTableOnPage();
  const { data: industries, isFetching: isIndustriesLoading } =
    useAdminIndustriesListQuery({ limit, page, search });

  return (
    <ManageIndustriesTemplate
      data={industries}
      isTableDataLoading={isIndustriesLoading}
      onLimitChange={onLimitChange}
      onPageChange={onPageChange}
      onSearchChange={onSearchChange}
    />
  );
};

export default IndustriesPage;
