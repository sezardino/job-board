import { Button, Grid, Link, Typography } from "@/components/base";
import {
  CustomerRegistrationForm,
  CustomerRegistrationFormValues,
} from "@/components/forms/CustomerRegistration/CustomerRegistrationForm";
import { PublicPageUrls } from "@/const";
import useTimer from "@/hooks/use-timer";
import {
  CustomerRegistrationResponse,
  RegistrationStatus,
  ResendVerificationEmailResponse,
} from "@/services/server/modules/auth/schema";
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

export interface CustomerRegistrationTemplateProps
  extends ComponentPropsWithoutRef<"div"> {
  registrationAction: ActionProp<
    CustomerRegistrationFormValues,
    CustomerRegistrationResponse
  >;
  resendEmailAction: ActionProp<string, ResendVerificationEmailResponse>;
}

export const CustomerRegistrationTemplate: FC<
  CustomerRegistrationTemplateProps
> = (props) => {
  const { resendEmailAction, registrationAction, className, ...rest } = props;
  const t = useTranslations("page.customer-registration");
  const [step, setStep] = useState<RegistrationStatus | "form">("form");
  const submittedEmail = useRef<string | null>(null);
  const { isActive: isTimerActive, startTimer, left: timeLeft } = useTimer({});

  const formSubmitHandler = useCallback(
    async (values: CustomerRegistrationFormValues) => {
      try {
        const response = await registrationAction.handler(values);

        setStep(response.status);
        submittedEmail.current = values.email;

        if (response.status === RegistrationStatus.Success) {
          startTimer();
        }
      } catch (error) {}
    },
    [registrationAction.handler, startTimer]
  );

  const resendHandler = useCallback(async () => {
    if (submittedEmail.current === null) return;
    if (isTimerActive) return;

    try {
      await resendEmailAction.handler(submittedEmail.current);
      startTimer();
    } catch (error) {}
  }, [isTimerActive, resendEmailAction, startTimer]);

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

      {step !== "form" && (
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
            {t(`${step}.title`)}
          </Typography>
          <Typography tag="p" styling="sm" className="text-center">
            {t(`${step}.description`)}
          </Typography>

          {step === RegistrationStatus.EmailUsed && (
            <Button
              as={NextLink}
              href={PublicPageUrls.login}
              variant="shadow"
              color="primary"
              className="justify-self-center"
              size="md"
            >
              {t("email-used.trigger")}
            </Button>
          )}

          {(step === RegistrationStatus.Success ||
            step === RegistrationStatus.WaitingForEmailConfirmation) && (
            <Grid gap={2} className="mt-4">
              <Button
                isDisabled={resendEmailAction.isLoading || isTimerActive}
                isLoading={resendEmailAction.isLoading}
                variant="shadow"
                color="primary"
                className="justify-self-center"
                size="md"
                onClick={resendHandler}
              >
                {t("success.resend-email.trigger")}
              </Button>

              <Typography tag="p" styling="xs" className="text-center">
                {t("success.resend-email.description")}
              </Typography>
              {!!timeLeft && isTimerActive && (
                <Typography tag="p" styling="xs" className="text-center">
                  {t("success.resend-email.interval", { value: timeLeft })}
                </Typography>
              )}
            </Grid>
          )}
        </Grid>
      )}
    </Grid>
  );
};
