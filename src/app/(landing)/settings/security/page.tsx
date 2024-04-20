"use client";

import { LoadingOverlay } from "@/components/base/LoadingOverlay/LoadingOverlay";
import { PasswordFormValues } from "@/components/forms/Password/PasswordForm";
import { SettingsSecurityTemplate } from "@/components/templates/Shared/SettingsSecurityTemplate";
import { useChangePasswordMutation } from "@/hooks";
import { useCallback } from "react";

const SettingsSecurityPage = () => {
  const { mutateAsync: changePassword, isPending: isChangePasswordPending } =
    useChangePasswordMutation();

  const changePasswordHandler = useCallback(
    async (values: PasswordFormValues) => {
      if (!values.oldPassword) return;

      return await changePassword({
        newPassword: values.password,
        oldPassword: values.oldPassword,
      });
    },
    [changePassword]
  );

  return (
    <>
      {isChangePasswordPending && <LoadingOverlay />}
      <SettingsSecurityTemplate
        changePasswordAction={{
          handler: changePasswordHandler,
          isLoading: isChangePasswordPending,
        }}
      />
    </>
  );
};

export default SettingsSecurityPage;
