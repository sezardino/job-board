import { useCreateContext } from "@/hooks";
import { IndustryPagesContext } from ".";

export const useIndustryPagesContext = () =>
  useCreateContext(IndustryPagesContext);
