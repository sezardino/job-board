import { LoadingOverlay } from "@/components/base";
import { useMyCompanyBaseDataQuery } from "@/hooks";
import { FC, PropsWithChildren, useMemo } from "react";
import { MyCompanyContext } from ".";

export const MyCompanyProvider: FC<PropsWithChildren> = ({ children }) => {
  const { data: baseData, isLoading: isBaseDataLoading } =
    useMyCompanyBaseDataQuery();

  const value = useMemo<MyCompanyContext>(() => {
    if (!baseData) return { id: "", name: "", slogan: null, logo: null };

    return {
      id: baseData.id,
      name: baseData.name,
      slogan: baseData.slogan,
      logo: baseData.logo,
    };
  }, [baseData]);

  return (
    <MyCompanyContext.Provider value={value}>
      {isBaseDataLoading && <LoadingOverlay />}
      {children}
    </MyCompanyContext.Provider>
  );
};
