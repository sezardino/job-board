import { DataListProp, DataProp } from "@/types";
import { useTranslations } from "next-intl";
import { useCallback, useMemo, type FC } from "react";

import { BreadcrumbItem } from "@/components/base/Breadcrumbs/BaseBreadcrumbs";

import {
  OfferFilterSeniority,
  OfferFilterStatus,
} from "@/components/modules/shared/CompanyOffersFilter/CompanyOffersFilter";

import { TableActions } from "@/components/UI/TableActions/TableActions";
import { AdminOffersTemplateWrapper } from "@/components/modules/admin/AdminOffersTemplateWrapper";
import { ManageOffersTableCellRenderFun } from "@/components/modules/shared/ManageOffersTable/ManageOffersTable";
import { AdminPageUrls } from "@/const";
import { OffersForManageResponse } from "@/services/bll/modules/offers/schema";
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

export type CompanyOffersTemplateProps = Props & DataListProp & OfferFilters;

export const CompanyOffersTemplate: FC<CompanyOffersTemplateProps> = (
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
    <AdminOffersTemplateWrapper
      {...offers}
      title={t("title", { value: company.name })}
      description={t("description")}
      breadcrumbs={breadcrumbs}
      offers={offers}
      statusFilter={statusFilter}
      seniorityFilter={seniorityFilter}
      limit={limit}
      onLimitChange={onLimitChange}
      onPageChange={onPageChange}
      onSearchChange={onSearchChange}
      page={page}
      actionsCell={actionsCell}
    />
  );
};
