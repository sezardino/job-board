import { FC, PropsWithChildren, useMemo } from "react";
import { MyCompanyContext } from ".";

export const MyCompanyProvider: FC<PropsWithChildren> = ({ children }) => {
  const value = useMemo<MyCompanyContext>(
    () => ({
      name: "My Company",
      id: "1",
    }),
    []
  );

  return (
    <MyCompanyContext.Provider value={value}>
      {children}
    </MyCompanyContext.Provider>
  );
};
