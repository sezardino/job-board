"use client";

import { CustomerRegistrationTemplate } from "@/components/templates/Auth/CustomerRegistrationTemplate";
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

  const resendHandler = useCallback(
    async (email: string) => resendVerificationEmail({ email }),
    [resendVerificationEmail]
  );

  return (
    <>
      {/* {isCustomerRegistrationLoading && <LoadingOverlay />} */}

      <CustomerRegistrationTemplate
        registrationAction={{
          handler: customerRegistration,
          isLoading: isCustomerRegistrationLoading,
        }}
        resendEmailAction={{
          handler: resendHandler,
          isLoading: isResendVerificationEmailLoading,
        }}
      />
    </>
  );
};

export default RegistrationPage;
