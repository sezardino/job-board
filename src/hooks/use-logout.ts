import { PublicPageUrls } from "@/const";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useLogoutMutation } from "./react-query/mutation/auth/logout";

export const useLogout = () => {
  const router = useRouter();
  const { mutateAsync: logout } = useLogoutMutation();

  const logoutHandler = useCallback(async () => {
    await logout({});
    router.push(PublicPageUrls.home);
  }, [logout, router]);

  return logoutHandler;
};
