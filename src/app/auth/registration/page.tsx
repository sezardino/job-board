"use client";

import { CustomerRegistrationTemplate } from "@/components/templates/Auth/CustomerRegistrationTemplate";
import { useCheckEmailAvailableMutation } from "@/hooks";
import { useCustomerRegistrationMutation } from "@/hooks/react-query/mutation/auth";
import { useResendVerificationEmailMutation } from "@/hooks/react-query/mutation/auth/resend-verification-email";
import { useCallback } from "react";

const RegistrationPage = () => {
  const {
    mutateAsync: customerRegistration,
    isPending: isCustomerRegistrationLoading,
  } = useCustomerRegistrationMutation();

  const {
    mutateAsync: resendVerificationEmail,
    isPending: isResendVerificationEmailLoading,
  } = useResendVerificationEmailMutation();

  const { mutateAsync: checkEmailAvailable, isPending: isCheckEmailLoading } =
    useCheckEmailAvailableMutation();

  const resendHandler = useCallback(
    async (email: string) => resendVerificationEmail({ email }),
    [resendVerificationEmail]
  );

  const checkEmailAvailableHandler = useCallback(
    async (email: string) =>
      checkEmailAvailable({ email }).then((res) => res.available),
    [checkEmailAvailable]
  );

  return (
    <>
      <CustomerRegistrationTemplate
        registrationAction={{
          handler: customerRegistration,
          isLoading: isCustomerRegistrationLoading,
        }}
        resendEmailAction={{
          handler: resendHandler,
          isLoading: isResendVerificationEmailLoading,
        }}
        checkEmailAvailableAction={{
          handler: checkEmailAvailableHandler,
          isLoading: isCheckEmailLoading,
        }}
      />
    </>
  );
};

export default RegistrationPage;
