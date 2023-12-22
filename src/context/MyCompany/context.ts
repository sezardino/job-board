import { createContext } from "react";

export type MyCompanyContext = {
  id: string;
  name: string;
  slogan: string | null;
};

export const MyCompanyContext = createContext<MyCompanyContext>({
  id: "",
  name: "",
  slogan: null,
});
