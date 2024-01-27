"use client";

import { CompanyRegistrationTemplate } from "@/components/templates/Auth/CompanyRegistrationTemplate";
import { useCheckEmailAvailableMutation } from "@/hooks";
import { useCompanyRegistrationMutation } from "@/hooks/react-query/mutation/auth/company-registration";
import { useCallback } from "react";

const RegistrationPage = () => {
  const {
    mutateAsync: companyRegistration,
    isPending: isCompanyRegistrationLoading,
  } = useCompanyRegistrationMutation();

  const { mutateAsync: checkEmailAvailable, isPending: isCheckEmailLoading } =
    useCheckEmailAvailableMutation();

  const checkEmailAvailableHandler = useCallback(
    async (email: string) =>
      checkEmailAvailable({ email }).then((res) => res.available),
    [checkEmailAvailable]
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
      checkCompanyEmailAvailableAction={{
        handler: checkEmailAvailableHandler,
        isLoading: isCheckEmailLoading,
      }}
    />
  );
};

export default RegistrationPage;
