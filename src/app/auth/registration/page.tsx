"use client";

import { LoadingOverlay } from "@/components/base";
import { CustomerRegistrationTemplate } from "@/components/templates/Auth/CustomerRegistrationTemplate";
import { useCustomerRegistrationMutation } from "@/hooks/react-query/mutation/auth";

const RegistrationPage = () => {
  const {
    mutateAsync: customerRegistration,
    isPending: isCustomerRegistrationLoading,
  } = useCustomerRegistrationMutation();

  return (
    <>
      {isCustomerRegistrationLoading && <LoadingOverlay />}

      <CustomerRegistrationTemplate
        onRegistrationRequest={customerRegistration}
      />
    </>
  );
};

export default RegistrationPage;
