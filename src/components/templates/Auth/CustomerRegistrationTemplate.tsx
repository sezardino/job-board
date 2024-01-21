import { Grid, Link, Typography } from "@/components/base";
import {
  CustomerRegistrationForm,
  CustomerRegistrationFormValues,
} from "@/components/forms/CustomerRegistration/CustomerRegistrationForm";
import { PublicPageUrls } from "@/const";
import {
  CustomerRegistrationResponse,
  RegistrationStatus,
} from "@/services/server/modules/auth/schema";
import { useTranslations } from "next-intl";
import NextLink from "next/link";
import {
  useCallback,
  useState,
  type ComponentPropsWithoutRef,
  type FC,
} from "react";
import { twMerge } from "tailwind-merge";

export interface CustomerRegistrationTemplateProps
  extends ComponentPropsWithoutRef<"div"> {
  onRegistrationRequest: (
    data: CustomerRegistrationFormValues
  ) => Promise<CustomerRegistrationResponse>;
}

export const CustomerRegistrationTemplate: FC<
  CustomerRegistrationTemplateProps
> = (props) => {
  const { onRegistrationRequest, className, ...rest } = props;
  const t = useTranslations("page.customer-registration");
  const [step, setStep] = useState<"form" | "success">("form");

  const formSubmitHandler = useCallback(
    async (values: CustomerRegistrationFormValues) => {
      try {
        const response = await onRegistrationRequest(values);

        if (response.status === RegistrationStatus.Success) {
          setStep("success");
        }
      } catch (error) {}
    },
    [onRegistrationRequest]
  );

  return (
    <Grid
      {...rest}
      gap={10}
      tag="section"
      className={twMerge("w-full max-w-lg mx-auto py-10", className)}
    >
      {step === "form" && (
        <>
          <Typography tag="h1" styling="xl" className="text-center">
            {t("form.title")}
          </Typography>
          <CustomerRegistrationForm
            onEmailAvailableRequest={async () => true}
            onFormSubmit={formSubmitHandler}
            className="px-4 py-6 sm:px-6  sm:py-10 border-2 rounded-2xl"
          />
          <Typography tag="p" styling="sm" className="text-center">
            {t("form.text")}{" "}
            <Link as={NextLink} to={PublicPageUrls.login} color="primary">
              {t("form.link")}
            </Link>
          </Typography>
        </>
      )}

      {step === "success" && (
        <Grid
          gap={2}
          className="px-4 py-6 sm:px-6  sm:py-10 border-2 rounded-2xl"
        >
          <Typography
            tag="h2"
            color="primary"
            styling="xl"
            weight="bold"
            className="text-center"
          >
            {t("success.title")}
          </Typography>
          <Typography tag="p" styling="sm" className="text-center">
            {t("success.description")}
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};
