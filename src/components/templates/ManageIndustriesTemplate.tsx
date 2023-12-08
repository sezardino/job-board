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
import { ConfirmModal } from "../UI/ConformModal/ConfirmModal";
import { TableWidget } from "../UI/TableWidget/TableWidget";
import { TitleDescription } from "../UI/TitleDescription/TitleDescription";
import { Button, Icon, LoadingOverlay, Modal } from "../base";
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
  isDeleteIndustryLoading: boolean;
  onDeleteIndustry: (id: string) => Promise<any>;
};

export type ManageIndustriesTemplateProps =
  ComponentPropsWithoutRef<"section"> & Props;

const CH = createColumnHelper<AdminIndustriesResponse["industries"][number]>();

export const ManageIndustriesTemplate: FC<ManageIndustriesTemplateProps> = (
  props
) => {
  const {
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
    className,
    ...rest
  } = props;
  const t = useTranslations("page.manage-industries");
  const statusT = useTranslations("entity.status");

  const [isCreateIndustryModalOpen, setIsCreateIndustryModalOpen] =
    useState(false);
  const [industryToDeleteId, setIndustryToDeleteId] = useState<string | null>(
    null
  );

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
      CH.accessor("id", {
        enableSorting: false,
        header: () => null,
        cell: (row) => (
          <div className="flex gap-1 items-center">
            <Button
              isDisabled={
                row.row.original._count.categories > 0 ||
                row.row.original._count.offers > 0
              }
              isIconOnly
              size="sm"
              variant="light"
              tooltip="Delete"
              color="danger"
              onClick={() => setIndustryToDeleteId(row.getValue())}
            >
              <Icon name="HiTrash" size={20} />
            </Button>
          </div>
        ),
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

  const deleteIndustryHandler = useCallback(async () => {
    if (!industryToDeleteId) return;

    try {
      onDeleteIndustry(industryToDeleteId);
      setIndustryToDeleteId(null);
    } catch (error) {}
  }, [industryToDeleteId, onDeleteIndustry]);

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

      <ConfirmModal
        isOpen={!!industryToDeleteId}
        onClose={() => setIndustryToDeleteId(null)}
        isLoading={isDeleteIndustryLoading}
        title={t("delete.title")}
        description={t("delete.description")}
        cancel={{
          text: t("delete.cancel"),
          onClick: () => setIndustryToDeleteId(null),
        }}
        confirm={{ text: t("delete.confirm"), onClick: deleteIndustryHandler }}
      />
    </>
  );
};
