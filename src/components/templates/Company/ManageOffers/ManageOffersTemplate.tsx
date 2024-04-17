import { TitleDescription } from "@/components/UI/TitleDescription/TitleDescription";
import { CompanyPageUrls } from "@/const";
import {
  ChangeOfferStatusResponse,
  OffersForManageResponse,
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
import { Button } from "@/components/base/Button/Button";
import {
  Dropdown,
  DropdownItemProps,
} from "@/components/base/Dropdown/Dropdown";
import { Grid } from "@/components/base/Grid/Grid";
import { Icon } from "@/components/base/Icon/Icon";
import {
  ManageOffersTable,
  ManageOffersTableCellRenderFun,
} from "@/components/modules/company/ManageOffersTable";
import {
  CompanyOffersFilter,
  CompanyOffersFilterProps,
} from "@/components/modules/shared/CompanyOffersFilter/CompanyOffersFilter";
import { EditOfferWrapper } from "@/components/wrappers/EditOfferWrapper";
import { DeleteOfferResponse } from "@/services/bll/modules/offers/schema/delete";
import { DropdownTrigger } from "@nextui-org/react";
import { OfferStatus } from "@prisma/client";
import Link from "next/link";

type Props = {
  offers: DataProp<OffersForManageResponse>;
  deleteAction: ActionProp<string, DeleteOfferResponse>;
  finishAction: ActionProp<string, ChangeOfferStatusResponse>;
  archiveAction: ActionProp<string, ChangeOfferStatusResponse>;
  publishAction: ActionProp<string, ChangeOfferStatusResponse>;
};

type PickerFiltersProps = Pick<
  CompanyOffersFilterProps,
  "statusFilter" | "seniorityFilter"
>;

export type ManageCompanyOffersTableAction = {
  type: "edit" | "delete" | "finish" | "archive" | "publish";
  id: string;
};

export type ManageOffersTemplateProps = ComponentPropsWithoutRef<"section"> &
  Props &
  PickerFiltersProps &
  DataListProp;

export const ManageOffersTemplate: FC<ManageOffersTemplateProps> = (props) => {
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
  const t = useTranslations("page.company.manage-offers");

  const [selectedTableAction, setSelectedTableAction] =
    useState<ManageCompanyOffersTableAction | null>(null);

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

  const actionsCell: ManageOffersTableCellRenderFun = useCallback(
    (row) => {
      const status = row.status;
      const id = row.id;

      const items: DropdownItemProps[] = [
        {
          key: "preview",
          as: Link,
          to: CompanyPageUrls.offer(id),
          text: t("actions.preview"),
        },
        {
          key: "applications",
          text: t("actions.applications"),
          to: CompanyPageUrls.applications(id),
        },
      ];

      items.push({
        key: "edit",
        text: t("actions.edit"),
        onClick: () => setSelectedTableAction({ type: "edit", id: id }),
      });

      if (status === OfferStatus.DRAFT) {
        items.push({
          key: "publish",
          text: t("actions.publish"),
          onClick: () =>
            setSelectedTableAction({
              type: "publish",
              id,
            }),
        });
      }

      if (status === OfferStatus.ACTIVE) {
        items.push({
          key: "finish",
          text: t("actions.finish"),
          onClick: () =>
            setSelectedTableAction({
              type: "finish",
              id,
            }),
        });
      }

      if (status === OfferStatus.FINISHED) {
        items.push({
          key: "archive",
          text: t("actions.archive"),
          onClick: () =>
            setSelectedTableAction({
              type: "archive",
              id,
            }),
        });
      }

      if (status !== OfferStatus.INACTIVE) {
        items.push({
          key: "delete",
          text: t("actions.delete"),
          color: "danger",
          onClick: () =>
            setSelectedTableAction({
              type: "delete",
              id,
            }),
        });
      }

      const disabledKeys = [];

      if (
        status === OfferStatus.INACTIVE ||
        status === OfferStatus.FINISHED ||
        status === OfferStatus.ARCHIVED
      ) {
        disabledKeys.push("edit");
      }
      console.log({ status: row.status, disabledKeys });

      return (
        <Dropdown
          placement="bottom-end"
          label="Actions dropdown"
          items={items}
          disabledKeys={disabledKeys}
        >
          <DropdownTrigger>
            <Button
              variant="light"
              color="default"
              text={t("actions.label")}
              isIconOnly
              endContent={<Icon name="HiDotsHorizontal" />}
            />
          </DropdownTrigger>
        </Dropdown>
      );
    },
    [t]
  );

  return (
    <>
      <Grid tag="section" gap={4} {...rest}>
        <Grid tag="header" gap={2}>
          <TitleDescription
            title={t("title")}
            titleLevel="h1"
            description={t("description")}
          />
          <CompanyOffersFilter
            onSearchChange={onSearchChange}
            seniorityFilter={seniorityFilter}
            statusFilter={statusFilter}
          >
            <Button
              as={NextLink}
              href={CompanyPageUrls.newOffer}
              color="primary"
              text={t("create")}
            />
          </CompanyOffersFilter>
        </Grid>

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
