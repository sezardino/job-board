import { createContext } from "react";

export type IndustryPagesContext = {
  id: string;
  name: string;
};

export const IndustryPagesContext = createContext<IndustryPagesContext>({
  id: "",
  name: "",
});
