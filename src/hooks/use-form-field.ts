import { useId } from "react";

export const useFormField = () => {
  const id = useId();
  const errorId = `${id}-error`;
  const descriptionId = `${id}-description`;

  return { id, errorId, descriptionId };
};
