"use client";

import { ManageCategoriesTemplate } from "@/components/templates/Admin/ManageCategories/ManageCategoriesTemplate";
import { useAdminCategoriesListQuery } from "@/hooks/react-query/query/categories/admin-list";
import { useDataOnPage } from "@/hooks/use-data-on-page";

type Props = {
  params: { industryId: string };
};

const CategoriesPage = (props: Props) => {
  const { industryId } = props.params;

  const { limit, onLimitChange, onPageChange, onSearchChange, page, search } =
    useDataOnPage();
  const categoriesQuery = useAdminCategoriesListQuery({
    limit,
    page,
    search,
    industryId,
  });

  return (
    <ManageCategoriesTemplate
      categories={categoriesQuery}
      industry={{ name: "test", id: industryId }}
      onLimitChange={onLimitChange}
      onPageChange={onPageChange}
      onSearchChange={onSearchChange}
    />
  );
};

export default CategoriesPage;
