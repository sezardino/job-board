import { useQueryClient } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { useCallback } from "react";

export const useLogout = () => {
  const client = useQueryClient();

  const logout = useCallback(async () => {
    await signOut();
    client.clear();
  }, [client]);

  return logout;
};
