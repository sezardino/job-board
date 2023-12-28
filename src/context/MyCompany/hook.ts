import { useCreateContext } from "@/hooks";
import { MyCompanyContext } from ".";

export const useMyCompanyContext = () => useCreateContext(MyCompanyContext);
