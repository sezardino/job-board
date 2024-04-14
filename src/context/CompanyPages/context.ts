import { FileEntity } from "@/types";
import { createContext } from "react";

export type CompanyPagesContext = {
  id: string;
  name: string;
  slogan: string | null;
  logo: FileEntity | null;
};

export const CompanyPagesContext = createContext<CompanyPagesContext>({
  id: "",
  name: "",
  slogan: null,
  logo: null,
});
