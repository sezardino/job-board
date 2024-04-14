import { Pagination, Spinner, cn } from "@nextui-org/react";
import { FC, useCallback, useState } from "react";
import { pdfjs } from "react-pdf";

const PDFViewer = dynamic(
  () => import("@/components/base/PDFViewer/PDFViewer"),
  {
    ssr: false,
  }
);

import { Button } from "@/components/base/Button/Button";
import { Icon } from "@/components/base/Icon/Icon";
import { Modal } from "@/components/base/Modal/Modal";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { twMerge } from "tailwind-merge";
import styles from "./PDFViewerModal.module.scss";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export type PDFViewerModalProps = {
  file?: string;
  isOpen: boolean;
  onClose: () => void;
};

export const PDFViewerModal: FC<PDFViewerModalProps> = (props) => {
  const { file, onClose, isOpen } = props;
  const t = useTranslations("components.shared.pdf-viewer-modal");

  const [totalPagesCount, setTotalPagesCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isDocumentLoading, setIsDocumentLoading] = useState(true);
  const [isPageLoading, setIsPageLoading] = useState(true);

  const documentLoadHandler = useCallback((totalPages: number) => {
    setTotalPagesCount(totalPages);
    setIsDocumentLoading(false);
  }, []);

  const isLoading = isDocumentLoading || isPageLoading;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="3xl"
      placement="top"
      className={cn(styles.element)}
    >
      <Modal.Header>
        {totalPagesCount > 1 && (
          <Pagination
            isCompact
            showControls
            total={totalPagesCount}
            page={currentPage}
            onChange={setCurrentPage}
          />
        )}

        <Button
          isIconOnly
          endContent={<Icon name="HiDownload" />}
          text={t("download")}
          href={file}
        />
      </Modal.Header>

      <Modal.Body className={twMerge(styles.body, isLoading && styles.loading)}>
        <PDFViewer
          page={currentPage + 1}
          file={file}
          onDocumentLoadSuccess={documentLoadHandler}
          onPageLoadStart={() => setIsPageLoading(true)}
          onPageRenderError={() => setIsPageLoading(false)}
          onPageLoadSuccess={() => setIsPageLoading(false)}
          className={cn(styles.viewer, isLoading && styles.loading)}
        />
      </Modal.Body>

      {isLoading && (
        <Spinner
          size="lg"
          label={isDocumentLoading ? t("loading.document") : t("loading.page")}
          className={styles.spinner}
        />
      )}
    </Modal>
  );
};
