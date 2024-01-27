"use client";

import { CompanyRegistrationTemplate } from "@/components/templates/Auth/CompanyRegistrationTemplate";
import { useCheckEmailAvailableMutation } from "@/hooks";
import { useCompanyRegistrationMutation } from "@/hooks/react-query/mutation/auth/company-registration";
import { useResendVerificationEmailMutation } from "@/hooks/react-query/mutation/auth/resend-verification-email";
import { useCheckCompanyNameAvailableMutation } from "@/hooks/react-query/mutation/companies";
import { useCallback } from "react";

const RegistrationPage = () => {
  const {
    mutateAsync: companyRegistration,
    isPending: isCompanyRegistrationLoading,
  } = useCompanyRegistrationMutation();

  const { mutateAsync: checkEmailAvailable, isPending: isCheckEmailLoading } =
    useCheckEmailAvailableMutation();
  const {
    mutateAsync: checkCompanyNameAvailable,
    isPending: isCheckNameLoading,
  } = useCheckCompanyNameAvailableMutation();

  const checkEmailAvailableHandler = useCallback(
    async (email: string) =>
      checkEmailAvailable({ email }).then((res) => res.available),
    [checkEmailAvailable]
  );

  const checkNameAvailableHandler = useCallback(
    async (name: string) =>
      checkCompanyNameAvailable({ name }).then((res) => res.available),
    [checkCompanyNameAvailable]
  );

  const {
    mutateAsync: resendVerificationEmail,
    isPending: isResendVerificationEmailLoading,
  } = useResendVerificationEmailMutation();

  const resendHandler = useCallback(
    async (email: string) => resendVerificationEmail({ email }),
    [resendVerificationEmail]
  );

  return (
    <CompanyRegistrationTemplate
      registrationAction={{
        handler: companyRegistration,
        isLoading: isCompanyRegistrationLoading,
      }}
      checkUserEmailAvailableAction={{
        handler: checkEmailAvailableHandler,
        isLoading: isCheckEmailLoading,
      }}
      checkCompanyNameAvailableAction={{
        handler: checkNameAvailableHandler,
        isLoading: isCheckNameLoading,
      }}
      resendEmailAction={{
        handler: resendHandler,
        isLoading: isResendVerificationEmailLoading,
      }}
    />
  );
};

export default RegistrationPage;
