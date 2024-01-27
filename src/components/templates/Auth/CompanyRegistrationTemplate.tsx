import { Grid, Link, Typography } from "@/components/base";
import {
  CompanyRegistrationForm,
  CompanyRegistrationFormValues,
} from "@/components/forms/CompanyRegistration/CompanyRegistrationForm";
import { RegistrationEmailVerificationStep } from "@/components/modules/auth/RegistrationEmailVerificationStep";
import { PublicPageUrls } from "@/const";
import { ResendVerificationEmailResponse } from "@/services/server/modules/auth/schema";
import {
  CompanyRegistrationResponse,
  CompanyRegistrationStatus,
} from "@/services/server/modules/auth/schema/company-registration";
import { ActionProp } from "@/types";
import { useTranslations } from "next-intl";
import NextLink from "next/link";
import {
  useCallback,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type FC,
} from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  registrationAction: ActionProp<
    CompanyRegistrationFormValues,
    CompanyRegistrationResponse
  >;
  resendEmailAction: ActionProp<string, ResendVerificationEmailResponse>;
  checkUserEmailAvailableAction: ActionProp<string, boolean>;
  checkCompanyNameAvailableAction: ActionProp<string, boolean>;
};

export type CompanyRegistrationTemplateProps = ComponentPropsWithoutRef<"div"> &
  Props;

export const CompanyRegistrationTemplate: FC<
  CompanyRegistrationTemplateProps
> = (props) => {
  const {
    resendEmailAction,
    checkCompanyNameAvailableAction,
    checkUserEmailAvailableAction,
    registrationAction,
    className,
    ...rest
  } = props;
  const t = useTranslations("page.company-registration");
  const [step, setStep] = useState<CompanyRegistrationStatus | "form">("form");
  const submittedEmail = useRef<string | null>(null);

  const formSubmitHandler = useCallback(
    async (values: CompanyRegistrationFormValues) => {
      try {
        const response = await registrationAction.handler(values);

        setStep(response.status);
        submittedEmail.current = values.owner.email;
      } catch (error) {}
    },
    [registrationAction]
  );

  const resendHandler = useCallback(async () => {
    if (submittedEmail.current === null) throw new Error();

    return await resendEmailAction.handler(submittedEmail.current);
  }, [resendEmailAction]);

  return (
    <Grid
      {...rest}
      gap={10}
      tag="section"
      className={twMerge("w-full max-w-2xl mx-auto py-10", className)}
    >
      {step === "form" && (
        <>
          <Typography tag="h1" styling="xl" className="text-center">
            {t("title")}
          </Typography>
          <CompanyRegistrationForm
            onCompanyNameAvailableRequest={
              checkCompanyNameAvailableAction.handler
            }
            onOwnerEmailAvailableRequest={checkUserEmailAvailableAction.handler}
            onFormSubmit={formSubmitHandler}
            className="px-4 pt-6 sm:px-6  sm:py-10 border-2 rounded-2xl"
          />
          <Typography tag="p" styling="sm" className="text-center">
            {t("login.description")}{" "}
            <Link as={NextLink} to={PublicPageUrls.login} color="primary">
              {t("login.link")}
            </Link>
          </Typography>
        </>
      )}

      {(step === CompanyRegistrationStatus.Success ||
        step === CompanyRegistrationStatus.WaitingForEmailConfirmation) && (
        <RegistrationEmailVerificationStep
          resendEmailAction={{
            handler: resendHandler,
            isLoading: resendEmailAction.isLoading,
          }}
          copy={{
            trigger: t("success.resend-email.trigger"),
            description: t("success.resend-email.description"),
            interval: t("success.resend-email.interval"),
          }}
          className="mt-4"
        />
      )}
    </Grid>
  );
};
