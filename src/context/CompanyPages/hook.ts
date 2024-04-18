import { useCreateContext } from "@/hooks";
import { CompanyPagesContext } from ".";

export const useCompanyPagesContext = () =>
  useCreateContext(CompanyPagesContext);
