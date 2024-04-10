"use client";

import { cn } from "@nextui-org/system";
import { ComponentPropsWithoutRef, FC, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

import { useWatchEffect } from "@/hooks";

import styles from "./PDFViewer.module.scss";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

type Props = {
  page: number;
  file?: string;
  onDocumentLoadSuccess: (totalPages: number) => void;
  onPageLoadSuccess: () => void;
  onPageRenderError: (error: Error) => void;
  onPageLoadStart: () => void;
};

export type PDFViewerProps = ComponentPropsWithoutRef<"div"> & Props;

const options = {
  cMapUrl: "cmaps/",
  cMapPacked: true,
  standardFontDataUrl: "standard_fonts/",
};

export const PDFViewer: FC<PDFViewerProps> = (props) => {
  const {
    page,
    file,
    onDocumentLoadSuccess,
    onPageLoadStart,
    onPageLoadSuccess,
    onPageRenderError,
    className,
    ...rest
  } = props;
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [pageWidth, setPageWidth] = useState<number>(0);
  const cachedPagesRef = useRef<Record<number, true>>({});

  useWatchEffect(() => {
    if (cachedPagesRef.current[page] === undefined) {
      onPageLoadStart();
      cachedPagesRef.current = { ...cachedPagesRef.current, [page]: true };
    }
  }, [page]);

  const pageLoadHandler = () => {
    if (wrapperRef.current) {
      setPageWidth(wrapperRef.current.offsetWidth);
    }

    onPageLoadSuccess();
  };

  return (
    <div {...rest} ref={wrapperRef} className={cn(styles.element, className)}>
      <Document
        file={file}
        options={options}
        renderMode="canvas"
        onLoadSuccess={({ numPages }) => onDocumentLoadSuccess(numPages)}
      >
        <Page
          pageNumber={page}
          renderAnnotationLayer={false}
          renderTextLayer={false}
          onLoadSuccess={pageLoadHandler}
          onRenderError={onPageRenderError}
          width={Math.max(pageWidth, 390)}
          loading=""
        />
      </Document>
    </div>
  );
};

export default PDFViewer;
