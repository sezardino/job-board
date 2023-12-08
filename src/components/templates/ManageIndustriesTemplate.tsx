import { AdminIndustriesResponse } from "@/services/server/modules/industries/schema";
import { createColumnHelper } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import {
  useCallback,
  useMemo,
  useState,
  type ComponentPropsWithoutRef,
  type FC,
} from "react";
import { twMerge } from "tailwind-merge";
import { TableWidget } from "../UI/TableWidget/TableWidget";
import { TitleDescription } from "../UI/TitleDescription/TitleDescription";
import { Button, LoadingOverlay, Modal } from "../base";
import { SearchForm } from "../base/SearchForm/SearchForm";
import {
  IndustryForm,
  IndustryFormValues,
} from "../forms/Industry/IndustryForm";

type Props = {
  data?: AdminIndustriesResponse;
  isTableDataLoading: boolean;
  onLimitChange: (limit: number) => void;
  onPageChange: (page: number) => void;
  onSearchChange: (search: string) => void;
  onCreateIndustry: (values: IndustryFormValues) => Promise<any>;
  onNameAvailableRequest: (email: string) => Promise<boolean>;
  isCreateIndustryLoading: boolean;
};

export type ManageIndustriesTemplateProps =
  ComponentPropsWithoutRef<"section"> & Props;

const CH = createColumnHelper<AdminIndustriesResponse["industries"][number]>();

export const ManageIndustriesTemplate: FC<ManageIndustriesTemplateProps> = (
  props
) => {
  const {
    onNameAvailableRequest,
    onCreateIndustry,
    isCreateIndustryLoading,
    data,
    isTableDataLoading,
    onLimitChange,
    onPageChange,
    onSearchChange,
    className,
    ...rest
  } = props;
  const t = useTranslations("page.manage-industries");
  const statusT = useTranslations("entity.status");

  const [isCreateIndustryModalOpen, setIsCreateIndustryModalOpen] =
    useState(false);

  const columns = useMemo(
    () => [
      CH.accessor("name", {
        enableSorting: false,
        header: t("table.head.name"),
      }),
      CH.accessor("status", {
        enableSorting: false,
        header: t("table.head.status"),
        cell: (row) => statusT(row.getValue()),
      }),
      CH.accessor("_count.categories", {
        enableSorting: false,
        header: t("table.head.categories"),
      }),
      CH.accessor("_count.offers", {
        enableSorting: false,
        header: t("table.head.offers"),
      }),
    ],
    [t, statusT]
  );

  const createIndustryHandler = useCallback(
    async (values: IndustryFormValues) => {
      try {
        await onCreateIndustry(values);
        setIsCreateIndustryModalOpen(false);
      } catch (error) {
        console.log(error);
      }
    },
    [onCreateIndustry]
  );

  return (
    <>
      <section
        {...rest}
        className={twMerge("grid grid-cols-1 gap-4", className)}
      >
        <TitleDescription
          title={t("title")}
          titleLevel="h1"
          description={t("description")}
        />
        <header className="flex justify-between gap-3 flex-wrap items-center">
          <SearchForm onSearch={onSearchChange} placeholder={t("search")} />

          <Button
            onClick={() => setIsCreateIndustryModalOpen(true)}
            color="primary"
          >
            {t("create.trigger")}
          </Button>
        </header>
        <TableWidget
          // @ts-ignore
          columns={columns}
          data={data?.industries || []}
          isLoading={isTableDataLoading}
          noDataMessage={t("table.no-data")}
          page={data?.meta.page || 0}
          limit={data?.meta.limit || 10}
          total={data?.meta.totalPages || 0}
          className="mt-4"
          onLimitChange={onLimitChange}
          onPageChange={onPageChange}
        />
      </section>

      <Modal
        isOpen={isCreateIndustryModalOpen}
        onClose={() => setIsCreateIndustryModalOpen(false)}
        title={t("create.title")}
        description={t("create.description")}
      >
        {isCreateIndustryLoading && <LoadingOverlay isInWrapper />}
        <IndustryForm
          onFormSubmit={createIndustryHandler}
          onNameAvailableRequest={onNameAvailableRequest}
          onCancelClick={() => setIsCreateIndustryModalOpen(false)}
        />
      </Modal>
    </>
  );
};
