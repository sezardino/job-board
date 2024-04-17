import { DataListProp, DataProp } from "@/types";
import { useTranslations } from "next-intl";
import { useCallback, useMemo, type FC } from "react";

import { BreadcrumbItem } from "@/components/base/Breadcrumbs/BaseBreadcrumbs";

import {
  CompanyOffersFilter,
  OfferFilterSeniority,
  OfferFilterStatus,
} from "@/components/modules/shared/CompanyOffersFilter/CompanyOffersFilter";

import {
  ManageOffersTable,
  ManageOffersTableCellRenderFun,
} from "@/components/modules/shared/ManageOffersTable/ManageOffersTable";
import { PreviewTemplateWrapper } from "@/components/modules/shared/PreviewTemplateWrapper/PreviewTemplateWrapper";
import { AdminPageUrls } from "@/const";
import { OffersForManageResponse } from "@/services/bll/modules/offers/schema";
import { TableActions } from "@/components/UI/TableActions/TableActions";
import Link from "next/link";

type OfferFilters = {
  statusFilter: {
    value: OfferFilterStatus;
    onChange: (value: OfferFilterStatus) => void;
  };
  seniorityFilter: {
    value: OfferFilterSeniority;
    onChange: (value: OfferFilterSeniority) => void;
  };
};

type Props = {
  offers: DataProp<OffersForManageResponse>;
  company: { name: string; id: string };
};

export type CategoryOffersTemplateProps = Props & DataListProp & OfferFilters;

export const CategoryOffersTemplate: FC<CategoryOffersTemplateProps> = (
  props
) => {
  const {
    statusFilter,
    seniorityFilter,
    limit,
    onLimitChange,
    onPageChange,
    onSearchChange,
    page,
    offers,
    company,
  } = props;
  const t = useTranslations("page.admin.company-offers");

  const breadcrumbs = useMemo<BreadcrumbItem[]>(
    () => [
      { label: t("breadcrumbs.companies"), href: AdminPageUrls.companies },
      { label: company.name },
    ],
    [t, company.name]
  );

  const actionsCell: ManageOffersTableCellRenderFun = useCallback(
    (row) => (
      <TableActions
        actions={[
          {
            icon: "HiEye",
            text: t("actions.preview"),
            as: Link,
            color: "primary",
            href: AdminPageUrls.offer(company.id, row.id),
          },
          {
            key: "applications",
            icon: "HiOutlineUsers",
            text: t("actions.applications"),
            color: "secondary",
            as: Link,
            href: AdminPageUrls.applications(company.id, row.id),
          },
        ]}
      />
    ),
    [company.id, t]
  );

  return (
    <PreviewTemplateWrapper
      copy={{
        title: t("title", { value: company.name }),
        description: t("description"),
      }}
      breadcrumbs={breadcrumbs}
      search={
        <CompanyOffersFilter
          onSearchChange={onSearchChange}
          seniorityFilter={seniorityFilter}
          statusFilter={statusFilter}
          isAdmin
          className="w-full"
        />
      }
    >
      <ManageOffersTable
        {...offers}
        data={offers.data?.data || []}
        total={offers.data?.meta.totalPages || 0}
        page={page}
        onPageChange={onPageChange}
        limit={limit}
        onLimitChange={onLimitChange}
        actionsCell={actionsCell}
      />
    </PreviewTemplateWrapper>
  );
};
