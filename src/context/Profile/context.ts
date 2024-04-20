import { UserRoles } from "@prisma/client";
import { createContext } from "react";

export type Profile = {
  id: string;
  email: string;
  name: string;
  avatar: string | null;
  role: UserRoles | null;
};

export type ProfileContext = {
  profile: Profile | null;
  isFetching: boolean;
};

export const initialProfileContext: ProfileContext = {
  profile: null,
  isFetching: true,
};

export const ProfileContext = createContext<ProfileContext>(
  initialProfileContext
);
