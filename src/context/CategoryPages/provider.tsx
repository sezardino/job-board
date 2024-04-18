import { LoadingOverlay } from "@/components/base/LoadingOverlay/LoadingOverlay";
import { useBaseCategoryDataQuery } from "@/hooks/react-query/query/categories/base-data";
import { FC, PropsWithChildren, useMemo } from "react";
import { CategoryPagesContext } from ".";

type Props = {
  categoryId: string;
};

type CategoryPagesProviderProps = PropsWithChildren & Props;

export const CategoryPagesProvider: FC<CategoryPagesProviderProps> = ({
  categoryId,
  children,
}) => {
  const { data: baseData, isLoading: isBaseDataLoading } =
    useBaseCategoryDataQuery(categoryId);

  const value = useMemo<CategoryPagesContext>(() => {
    if (!baseData) return { id: "", name: "" };

    return {
      id: baseData.id,
      name: baseData.name,
    };
  }, [baseData]);

  return (
    <CategoryPagesContext.Provider value={value}>
      {isBaseDataLoading && <LoadingOverlay />}
      {children}
    </CategoryPagesContext.Provider>
  );
};
