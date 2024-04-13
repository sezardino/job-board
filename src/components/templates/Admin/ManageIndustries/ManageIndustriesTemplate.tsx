import { Button } from "@/components/base/Button/Button";
import { LoadingOverlay } from "@/components/base/LoadingOverlay/LoadingOverlay";
import { ModalWithDescription } from "@/components/base/ModalWithDescription/ModalWithDescription";
import { IndustriesTable } from "@/components/modules/admin/IndustriesTable";
import { AdminIndustriesResponse } from "@/services/bll/modules/industries/schema";
import { ActionProp } from "@/types";
import { EntityStatus } from "@prisma/client";
import { useTranslations } from "next-intl";
import {
  useCallback,
  useState,
  type ComponentPropsWithoutRef,
  type FC,
} from "react";
import { ConfirmModal } from "../../../UI/ConformModal/ConfirmModal";
import { TitleDescription } from "../../../UI/TitleDescription/TitleDescription";
import { SearchForm } from "../../../base/SearchForm/SearchForm";
import {
  CreateIndustryForm,
  CreateIndustryFormValues,
} from "../../../forms/CreateIndustry/CreateIndustryForm";
import {
  UpdateIndustryForm,
  UpdateIndustryFormValues,
} from "../../../forms/UpdateIndustry/UpdateIndustryForm";

import { Grid } from "@/components/base/Grid/Grid";
import styles from "./ManageIndustriesTemplate.module.scss";

type Props = {
  data?: AdminIndustriesResponse;
  isTableDataLoading: boolean;
  onLimitChange: (limit: number) => void;
  onPageChange: (page: number) => void;
  onSearchChange: (search: string) => void;
  onCreateIndustry: (values: CreateIndustryFormValues) => Promise<any>;
  onNameAvailableRequest: (email: string) => Promise<boolean>;
  isCreateIndustryLoading: boolean;
  isDeleteIndustryLoading: boolean;
  onDeleteIndustry: (id: string) => Promise<any>;
  update: ActionProp<UpdateIndustryFormValues & { id: string }>;
};

export type ManageIndustriesTemplateProps =
  ComponentPropsWithoutRef<"section"> & Props;

export const ManageIndustriesTemplate: FC<ManageIndustriesTemplateProps> = (
  props
) => {
  const {
    update,
    isDeleteIndustryLoading,
    onDeleteIndustry,
    onNameAvailableRequest,
    onCreateIndustry,
    isCreateIndustryLoading,
    data,
    isTableDataLoading,
    onLimitChange,
    onPageChange,
    onSearchChange,
    ...rest
  } = props;
  const t = useTranslations("page.admin.manage-industries");

  const [isCreateIndustryModalOpen, setIsCreateIndustryModalOpen] =
    useState(false);
  const [toDeleteId, setToDeleteId] = useState<string | null>(null);
  const [toUpdateIndustry, setToUpdateIndustry] = useState<{
    id: string;
    status: EntityStatus;
  } | null>(null);

  const createIndustryHandler = useCallback(
    async (values: CreateIndustryFormValues) => {
      try {
        await onCreateIndustry(values);
        setIsCreateIndustryModalOpen(false);
      } catch (error) {}
    },
    [onCreateIndustry]
  );

  const updateIndustryHandler = useCallback(
    async (values: UpdateIndustryFormValues) => {
      if (!toUpdateIndustry) return;

      try {
        await update.handler({ ...values, id: toUpdateIndustry.id });
        setToUpdateIndustry(null);
      } catch (error) {}
    },
    [update, toUpdateIndustry]
  );

  return (
    <>
      <Grid {...rest} tag="section" gap={4}>
        <TitleDescription
          title={t("title")}
          titleLevel="h1"
          description={t("description")}
        />
        <header className={styles.header}>
          <SearchForm onSearch={onSearchChange} placeholder={t("search")} />

          <Button
            onClick={() => setIsCreateIndustryModalOpen(true)}
            color="primary"
            text={t("create.trigger")}
          />
        </header>
        <IndustriesTable
          data={data?.data || []}
          isLoading={isTableDataLoading}
          noDataMessage={t("table.no-data")}
          page={data?.meta.page || 0}
          limit={data?.meta.limit || 10}
          total={data?.meta.totalPages || 0}
          className="mt-4"
          onLimitChange={onLimitChange}
          onPageChange={onPageChange}
          onSelectToDelete={setToDeleteId}
          onSelectToUpdate={setToUpdateIndustry}
        />
      </Grid>

      <ModalWithDescription
        isOpen={isCreateIndustryModalOpen}
        onClose={() => setIsCreateIndustryModalOpen(false)}
        title={t("create.title")}
        description={t("create.description")}
      >
        <ModalWithDescription.Body>
          {isCreateIndustryLoading && <LoadingOverlay isInWrapper />}
          <CreateIndustryForm
            onFormSubmit={createIndustryHandler}
            onNameAvailableRequest={onNameAvailableRequest}
            onCancelClick={() => setIsCreateIndustryModalOpen(false)}
          />
        </ModalWithDescription.Body>
      </ModalWithDescription>

      {!!toUpdateIndustry && (
        <ModalWithDescription
          isOpen
          onClose={() => setToUpdateIndustry(null)}
          title={t("update.title")}
          description={t("update.description")}
        >
          <ModalWithDescription.Body>
            {update.isLoading && <LoadingOverlay isInWrapper />}
            <UpdateIndustryForm
              onFormSubmit={updateIndustryHandler}
              initialStatus={toUpdateIndustry.status}
              onCancelClick={() => setToUpdateIndustry(null)}
            />
          </ModalWithDescription.Body>
        </ModalWithDescription>
      )}

      <ConfirmModal
        isOpen={!!toDeleteId}
        onClose={() => setToDeleteId(null)}
        isLoading={isDeleteIndustryLoading}
        title={t("delete.title")}
        description={t("delete.description")}
        buttons={[
          {
            text: t("delete.cancel"),
            variant: "bordered",
            onClick: () => setToDeleteId(null),
          },
          {
            text: t("delete.confirm"),
            color: "danger",
            onClick: async () =>
              toDeleteId ? onDeleteIndustry(toDeleteId) : undefined,
          },
        ]}
      />
    </>
  );
};
