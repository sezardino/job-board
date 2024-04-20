"use client";

import { LoadingOverlay } from "@/components/base/LoadingOverlay/LoadingOverlay";
import { useCurrentUserProfileQuery } from "@/hooks/react-query/query/users/current-user";
import { FC, PropsWithChildren, useMemo } from "react";
import { ProfileContext, initialProfileContext } from ".";

type ProfileProviderProps = PropsWithChildren;

export const ProfileProvider: FC<ProfileProviderProps> = ({ children }) => {
  const { data, isFetching } = useCurrentUserProfileQuery();

  const value = useMemo<ProfileContext>(() => {
    if (!data) return initialProfileContext;

    return {
      profile: { ...data, avatar: data.avatar?.url ?? null },
      isFetching,
    };
  }, [data, isFetching]);

  return (
    <ProfileContext.Provider value={value}>
      {isFetching && <LoadingOverlay />}
      {children}
    </ProfileContext.Provider>
  );
};
