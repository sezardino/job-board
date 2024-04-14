import { LoadingOverlay } from "@/components/base/LoadingOverlay/LoadingOverlay";
import { useCompanyBaseDataQuery } from "@/hooks";
import { FC, PropsWithChildren, useMemo } from "react";
import { CompanyPagesContext } from ".";

type Props = {
  companyId?: string;
};

type CompanyPagesProviderProps = PropsWithChildren & Props;

export const CompanyPagesProvider: FC<CompanyPagesProviderProps> = ({
  companyId,
  children,
}) => {
  const { data: baseData, isLoading: isBaseDataLoading } =
    useCompanyBaseDataQuery(companyId);

  const value = useMemo<CompanyPagesContext>(() => {
    if (!baseData) return { id: "", name: "", slogan: null, logo: null };

    return {
      id: baseData.id,
      name: baseData.name,
      slogan: baseData.slogan,
      logo: baseData.logo,
    };
  }, [baseData]);

  return (
    <CompanyPagesContext.Provider value={value}>
      {isBaseDataLoading && <LoadingOverlay />}
      {children}
    </CompanyPagesContext.Provider>
  );
};
