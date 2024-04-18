import { QueryProps } from "@/types";
import { useTranslations } from "next-intl";
import { type FC } from "react";
import { SearchForm } from "../../../base/SearchForm/SearchForm";

import { CategoriesTable } from "@/components/modules/admin/CategoriesTable";
import { PreviewTemplateWrapper } from "@/components/modules/shared/PreviewTemplateWrapper/PreviewTemplateWrapper";
import { AdminPageUrls } from "@/const";
import { AdminCategoriesResponse } from "@/services/bll/modules/categories/schema";

type Props = {
  industry: { name: string; id: string };
  categories: QueryProps<AdminCategoriesResponse>;
  onLimitChange: (limit: number) => void;
  onPageChange: (page: number) => void;
  onSearchChange: (search: string) => void;
};

export type ManageCategoriesTemplateProps = Props;

export const ManageCategoriesTemplate: FC<ManageCategoriesTemplateProps> = (
  props
) => {
  const { industry, categories, onLimitChange, onPageChange, onSearchChange } =
    props;
  const t = useTranslations("page.admin.manage-industries");

  return (
    <PreviewTemplateWrapper
      copy={{
        title: t("title"),
        description: t("description"),
      }}
      search={
        <SearchForm onSearch={onSearchChange} placeholder={t("search")} />
      }
      breadcrumbs={[
        { label: t("breadcrumbs.home"), href: AdminPageUrls.home },
        { label: t("breadcrumbs.industries"), href: AdminPageUrls.industries },
        {
          label: industry.name,
          href: AdminPageUrls.categories(industry.id),
        },
      ]}
    >
      <CategoriesTable
        industryId={industry.id}
        data={categories.data?.data || []}
        isLoading={categories.isFetching}
        page={categories.data?.meta.page || 0}
        limit={categories.data?.meta.limit || 10}
        total={categories.data?.meta.totalPages || 0}
        onLimitChange={onLimitChange}
        onPageChange={onPageChange}
      />
    </PreviewTemplateWrapper>
  );
};
