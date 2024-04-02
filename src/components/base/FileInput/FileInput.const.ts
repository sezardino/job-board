export const AcceptedExt = {
  // doc
  pdf: "application/pdf",

  // images
  jpg: "image/jpg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
} as const;

export type FileInputFileAcceptedTypes = "image" | "pdf";

export const fileInputExtensions: Record<FileInputFileAcceptedTypes, string[]> =
  {
    image: [AcceptedExt.png, AcceptedExt.jpeg, AcceptedExt.webp],
    pdf: [AcceptedExt.pdf],
  };
