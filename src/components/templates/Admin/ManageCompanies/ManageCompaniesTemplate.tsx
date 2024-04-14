import { CompaniesTable } from "@/components/modules/admin/CompaniesTable";
import { AdminCompaniesResponse } from "@/services/bll/modules/companies/schema";
import { type FC } from "react";
import { SearchForm } from "../../../base/SearchForm/SearchForm";

import { TitleDescription } from "@/components/UI/TitleDescription/TitleDescription";
import { Grid } from "@/components/base/Grid/Grid";
import { QueryProps } from "@/types";
import { useTranslations } from "next-intl";
import styles from "./ManageCompaniesTemplate.module.scss";

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
    <Grid tag="section" gap={4}>
      <header className={styles.header}>
        <TitleDescription
          title={t("title")}
          titleLevel="h1"
          description={t("description")}
        />

        <SearchForm onSearch={onSearchChange} />
      </header>

      <CompaniesTable
        data={companies?.data?.data || []}
        isLoading={companies.isFetching}
        page={companies?.data?.meta.page || 0}
        limit={companies?.data?.meta.limit || 10}
        total={companies?.data?.meta.totalPages || 0}
        onLimitChange={onLimitChange}
        onPageChange={onPageChange}
      />
    </Grid>
  );
};
