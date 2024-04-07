import {
  OfferSeniorityFilters,
  OfferStatusFilters,
} from "@/app/(panels)/company/offers/page";
import { TitleDescription } from "@/components/UI/TitleDescription/TitleDescription";
import { SearchForm } from "@/components/base/SearchForm/SearchForm";
import { Select } from "@/components/base/Select/Select";
import { CompanyPageUrls } from "@/const";
import {
  ChangeOfferStatusResponse,
  CurrentCompanyOffersResponse,
} from "@/services/bll/modules/offers/schema";
import { ActionProp, DataListProp, DataProp } from "@/types";
import { useTranslations } from "next-intl";
import {
  useCallback,
  useMemo,
  useState,
  type ComponentPropsWithoutRef,
  type FC,
} from "react";

import NextLink from "next/link";

import {
  ConfirmModal,
  ConfirmModalProps,
} from "@/components/UI/ConformModal/ConfirmModal";
import { TableWidget } from "@/components/UI/TableWidget/TableWidget";
import { Button } from "@/components/base/Button/Button";
import { Grid } from "@/components/base/Grid/Grid";
import { EditOfferWrapper } from "@/components/wrappers/EditOfferWrapper";
import { DeleteOfferResponse } from "@/services/bll/modules/offers/schema/delete";
import styles from "./ManageCompanyOffersTemplate.module.scss";
import {
  ManageCompanyOffersTableAction,
  useCompanyOffersTable,
} from "./use-table";

type OfferFilters = {
  statusFilter: {
    value: OfferStatusFilters;
    onChange: (value: OfferStatusFilters) => void;
  };
  seniorityFilter: {
    value: OfferSeniorityFilters;
    onChange: (value: OfferSeniorityFilters) => void;
  };
  deleteAction: ActionProp<string, DeleteOfferResponse>;
  finishAction: ActionProp<string, ChangeOfferStatusResponse>;
  archiveAction: ActionProp<string, ChangeOfferStatusResponse>;
  publishAction: ActionProp<string, ChangeOfferStatusResponse>;
};

type Props = {
  offers: DataProp<CurrentCompanyOffersResponse>;
};

export type ManageCompanyOffersTemplateProps =
  ComponentPropsWithoutRef<"section"> & Props & DataListProp & OfferFilters;

export const ManageCompanyOffersTemplate: FC<
  ManageCompanyOffersTemplateProps
> = (props) => {
  const {
    statusFilter,
    seniorityFilter,
    limit,
    onLimitChange,
    onPageChange,
    onSearchChange,
    archiveAction,
    deleteAction,
    finishAction,
    publishAction,
    page,
    search,
    offers,
    className,
    ...rest
  } = props;
  const t = useTranslations("components.manage-company-job-offers-template");

  const [selectedTableAction, setSelectedTableAction] =
    useState<ManageCompanyOffersTableAction | null>(null);

  const { columns, seniorityFilterOptions, statusFilterOptions } =
    useCompanyOffersTable({
      onAction: setSelectedTableAction,
    });

  const confirmHandler = useCallback(async () => {
    if (!selectedTableAction) return;

    const { type, id } = selectedTableAction;

    try {
      switch (type) {
        case "delete":
          await deleteAction.handler(id);
          break;
        case "archive":
          await archiveAction.handler(id);
          break;
        case "finish":
          await finishAction.handler(id);
          break;
        case "publish":
          await publishAction.handler(id);
          break;

        default:
          throw new Error("Unknown action type");
      }

      setSelectedTableAction(null);
    } catch (error) {}
  }, [
    archiveAction,
    deleteAction,
    finishAction,
    publishAction,
    selectedTableAction,
  ]);

  const confirmModals = useMemo<ConfirmModalProps[]>(() => {
    const onClose = () => setSelectedTableAction(null);
    const cancelProps = { color: "default", variant: "bordered" };

    return [
      {
        isOpen: selectedTableAction?.type === "delete",
        onClose,
        title: t("modals.delete.title"),
        description: t("modals.delete.description"),
        buttons: [
          {
            ...cancelProps,
            text: t("modals.delete.cancel"),
            onClick: onClose,
          },
          {
            text: t("modals.delete.confirm"),
            color: "danger",
            onClick: confirmHandler,
          },
        ],
      },
      {
        isOpen: selectedTableAction?.type === "archive",
        onClose,
        title: t("modals.archive.title"),
        description: t("modals.archive.description"),
        buttons: [
          {
            ...cancelProps,
            text: t("modals.archive.cancel"),
            onClick: onClose,
          },
          {
            text: t("modals.archive.confirm"),
            onClick: confirmHandler,
          },
        ],
      },
      {
        isOpen: selectedTableAction?.type === "finish",
        onClose,
        title: t("modals.finish.title"),
        description: t("modals.finish.description"),
        buttons: [
          {
            ...cancelProps,
            text: t("modals.finish.cancel"),
            onClick: onClose,
          },
          {
            text: t("modals.finish.confirm"),
            onClick: confirmHandler,
          },
        ],
      },
      {
        isOpen: selectedTableAction?.type === "publish",
        onClose,
        title: t("modals.publish.title"),
        description: t("modals.publish.description"),
        buttons: [
          {
            ...cancelProps,
            text: t("modals.publish.cancel"),
            onClick: onClose,
          },
          {
            text: t("modals.publish.confirm"),
            onClick: confirmHandler,
          },
        ],
      },
    ] as ConfirmModalProps[];
  }, [confirmHandler, selectedTableAction?.type, t]);

  return (
    <>
      <Grid tag="section" gap={4} {...rest}>
        <Grid tag="header" gap={2}>
          <TitleDescription
            title={t("title")}
            titleLevel="h1"
            description={t("description")}
          />
          <div className={styles.wrapper}>
            <div className={styles.search}>
              <SearchForm placeholder={t("search")} onSearch={onSearchChange} />

              <Select
                options={statusFilterOptions}
                value={statusFilter.value}
                defaultSelectedKeys={[statusFilter.value]}
                isMultiple={false}
                onSelectChange={statusFilter.onChange}
                placeholder={t("filters.status")}
                aria-label={t("filters.status")}
                className={styles.filter}
              />
              <Select
                options={seniorityFilterOptions}
                value={seniorityFilter.value}
                defaultSelectedKeys={[seniorityFilter.value]}
                isMultiple={false}
                onSelectChange={seniorityFilter.onChange}
                placeholder={t("filters.seniority")}
                aria-label={t("filters.seniority")}
                className={styles.filter}
              />
            </div>
            <Button
              as={NextLink}
              href={CompanyPageUrls.newOffer}
              color="primary"
            >
              {t("create")}
            </Button>
          </div>
        </Grid>

        <TableWidget
          {...offers}
          columns={columns}
          data={offers.data?.data || []}
          total={offers.data?.meta.totalPages || 0}
          page={page}
          onPageChange={onPageChange}
          limit={limit}
          onLimitChange={onLimitChange}
        />
      </Grid>

      <EditOfferWrapper
        offerId={
          selectedTableAction?.type === "edit"
            ? selectedTableAction.id
            : undefined
        }
        onClose={() => setSelectedTableAction(null)}
      />

      {confirmModals.map((m, i) => (
        <ConfirmModal key={i} {...m} />
      ))}
    </>
  );
};
