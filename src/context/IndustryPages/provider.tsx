import { LoadingOverlay } from "@/components/base/LoadingOverlay/LoadingOverlay";
import { useBaseIndustryDataQuery } from "@/hooks/react-query/query/industries/base-data";
import { FC, PropsWithChildren, useMemo } from "react";
import { IndustryPagesContext } from ".";

type Props = {
  industryId: string;
};

type IndustryPagesProviderProps = PropsWithChildren & Props;

export const IndustryPagesProvider: FC<IndustryPagesProviderProps> = ({
  industryId,
  children,
}) => {
  const { data: baseData, isLoading: isBaseDataLoading } =
    useBaseIndustryDataQuery(industryId);

  const value = useMemo<IndustryPagesContext>(() => {
    if (!baseData) return { id: "", name: "" };

    return {
      id: baseData.id,
      name: baseData.name,
    };
  }, [baseData]);

  return (
    <IndustryPagesContext.Provider value={value}>
      {isBaseDataLoading && <LoadingOverlay />}
      {children}
    </IndustryPagesContext.Provider>
  );
};
