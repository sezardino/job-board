import { DataListProp, DataProp } from "@/types";
import { type FC } from "react";

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
import { OffersForManageResponse } from "@/services/bll/modules/offers/schema";

type Props = {
  title: string;
  description: string;
  breadcrumbs: BreadcrumbItem[];
  offers: DataProp<OffersForManageResponse>;
  statusFilter: {
    value: OfferFilterStatus;
    onChange: (value: OfferFilterStatus) => void;
  };
  seniorityFilter: {
    value: OfferFilterSeniority;
    onChange: (value: OfferFilterSeniority) => void;
  };
  actionsCell?: ManageOffersTableCellRenderFun;
};

export type AdminOffersTemplateWrapperProps = Props &
  Omit<DataListProp, "search">;

export const AdminOffersTemplateWrapper: FC<AdminOffersTemplateWrapperProps> = (
  props
) => {
  const {
    title,
    description,
    actionsCell,
    breadcrumbs,
    statusFilter,
    seniorityFilter,
    limit,
    onLimitChange,
    onPageChange,
    onSearchChange,
    page,
    offers,
  } = props;

  return (
    <PreviewTemplateWrapper
      copy={{ title, description }}
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
