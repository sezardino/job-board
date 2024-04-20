import { UserRoles } from "@prisma/client";
import { createContext } from "react";

export type Profile = {
  id: string;
  email: string;
  name: string;
  avatar: string | null;
  role: UserRoles | null;
};

export type ProfileContext = Profile | null;

export const ProfileContext = createContext<ProfileContext>(null);
