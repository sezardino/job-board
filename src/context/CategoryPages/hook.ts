import { useCreateContext } from "@/hooks";
import { CategoryPagesContext } from ".";

export const useCategoryPagesContext = () =>
  useCreateContext(CategoryPagesContext);
