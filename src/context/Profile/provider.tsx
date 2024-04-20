"use client";

import { LoadingOverlay } from "@/components/base/LoadingOverlay/LoadingOverlay";
import { useCurrentUserProfileQuery } from "@/hooks/react-query/query/users/current-user";
import { FC, PropsWithChildren, useMemo } from "react";
import { ProfileContext } from ".";

type ProfileProviderProps = PropsWithChildren;

export const ProfileProvider: FC<ProfileProviderProps> = ({ children }) => {
  const { data: currentProfile, isLoading: isCurrentProfileLoading } =
    useCurrentUserProfileQuery();

  const value = useMemo<ProfileContext>(() => {
    if (!currentProfile) return null;

    return { ...currentProfile, avatar: currentProfile.avatar?.url ?? null };
  }, [currentProfile]);

  return (
    <ProfileContext.Provider value={value}>
      {isCurrentProfileLoading && <LoadingOverlay />}
      {children}
    </ProfileContext.Provider>
  );
};
