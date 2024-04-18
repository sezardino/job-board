import { createContext } from "react";

export type CategoryPagesContext = {
  id: string;
  name: string;
};

export const CategoryPagesContext = createContext<CategoryPagesContext>({
  id: "",
  name: "",
});
