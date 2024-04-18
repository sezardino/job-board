import { CompaniesTable } from "@/components/modules/admin/CompaniesTable";
import { AdminCompaniesResponse } from "@/services/bll/modules/companies/schema";
import { type FC } from "react";
import { SearchForm } from "../../../base/SearchForm/SearchForm";

import { PreviewTemplateWrapper } from "@/components/modules/shared/PreviewTemplateWrapper/PreviewTemplateWrapper";
import { AdminPageUrls } from "@/const";
import { QueryProps } from "@/types";
import { useTranslations } from "next-intl";

type Props = {
  companies: QueryProps<AdminCompaniesResponse>;
  onLimitChange: (limit: number) => void;
  onPageChange: (page: number) => void;
  onSearchChange: (search: string) => void;
};

export type ManageCompaniesTemplateProps = Props;

export const ManageCompaniesTemplate: FC<ManageCompaniesTemplateProps> = (
  props
) => {
  const { companies, onLimitChange, onPageChange, onSearchChange } = props;
  const t = useTranslations("page.admin.manage-companies");

  return (
    <PreviewTemplateWrapper
      copy={{ title: t("title"), description: t("description") }}
      breadcrumbs={[
        { label: t("breadcrumbs.home"), href: AdminPageUrls.home },
        { label: t("breadcrumbs.companies") },
      ]}
      search={<SearchForm onSearch={onSearchChange} />}
    >
      <CompaniesTable
        data={companies?.data?.data || []}
        isLoading={companies.isFetching}
        page={companies?.data?.meta.page || 0}
        limit={companies?.data?.meta.limit || 10}
        total={companies?.data?.meta.totalPages || 0}
        onLimitChange={onLimitChange}
        onPageChange={onPageChange}
      />
    </PreviewTemplateWrapper>
  );
};
