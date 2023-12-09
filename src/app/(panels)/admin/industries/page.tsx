"use client";

import { ManageIndustriesTemplate } from "@/components/templates/ManageIndustriesTemplate";
import { useCheckIndustryNameAvailableMutation } from "@/hooks/react-query/mutation/industries/check-name";
import { useCreateIndustryMutation } from "@/hooks/react-query/mutation/industries/create";
import { useDeleteIndustryMutation } from "@/hooks/react-query/mutation/industries/delete";
import { useUpdateIndustryMutation } from "@/hooks/react-query/mutation/industries/update";
import { useAdminIndustriesListQuery } from "@/hooks/react-query/query/industries";
import { useTableOnPage } from "@/hooks/use-table-on-page";
import { useCallback } from "react";

const IndustriesPage = () => {
  const { limit, onLimitChange, onPageChange, onSearchChange, page, search } =
    useTableOnPage();
  const { data: industries, isFetching: isIndustriesLoading } =
    useAdminIndustriesListQuery({ limit, page, search });

  const { mutateAsync: createIndustry, isPending: isCreateIndustryLoading } =
    useCreateIndustryMutation();

  const { mutateAsync: deleteIndustry, isPending: isDeleteIndustryLoading } =
    useDeleteIndustryMutation();

  const { mutateAsync: updateIndustry, isPending: isUpdateIndustryLoading } =
    useUpdateIndustryMutation();

  const { mutateAsync: checkNameAvailable } =
    useCheckIndustryNameAvailableMutation();

  const checkNameAvailableHandler = useCallback(
    async (name: string) => {
      const response = await checkNameAvailable({ name });

      return response.available;
    },
    [checkNameAvailable]
  );

  return (
    <ManageIndustriesTemplate
      data={industries}
      isTableDataLoading={isIndustriesLoading}
      onLimitChange={onLimitChange}
      onPageChange={onPageChange}
      onSearchChange={onSearchChange}
      onNameAvailableRequest={checkNameAvailableHandler}
      onCreateIndustry={createIndustry}
      isCreateIndustryLoading={isCreateIndustryLoading}
      isDeleteIndustryLoading={isDeleteIndustryLoading}
      onDeleteIndustry={deleteIndustry}
      update={{ handler: updateIndustry, isLoading: isUpdateIndustryLoading }}
    />
  );
};

export default IndustriesPage;
