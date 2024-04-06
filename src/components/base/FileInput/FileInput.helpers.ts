import {
  FileInputFileAcceptedTypes,
  fileInputExtensions,
} from "./FileInput.const";

export const resetFileInput = (input: HTMLInputElement) => {
  const parentNode = input.parentNode;

  if (!parentNode) return;

  const form = document.createElement("form");
  const ref = input.nextSibling;
  form.appendChild(input);
  form.reset();
  parentNode.insertBefore(input, ref);
};

export const checkFilesType = (
  files: File[],
  types: FileInputFileAcceptedTypes[]
) => {
  if (!files) return true;
  const acceptedTypes = types.map((type) => fileInputExtensions[type]).flat();

  return files.every((file) => {
    if (file instanceof File) {
      return acceptedTypes.includes(file.type);
    }

    return true;
  });
};
