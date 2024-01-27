import { Grid, Link, Typography } from "@/components/base";
import {
  CompanyRegistrationForm,
  CompanyRegistrationFormValues,
} from "@/components/forms/CompanyRegistration/CompanyRegistrationForm";
import { PublicPageUrls } from "@/const";
import { CompanyRegistrationResponse } from "@/services/server/modules/auth/schema/company-registration";
import { ActionProp } from "@/types";
import { useTranslations } from "next-intl";
import NextLink from "next/link";
import { type ComponentPropsWithoutRef, type FC } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  registrationAction: ActionProp<
    CompanyRegistrationFormValues,
    CompanyRegistrationResponse
  >;
  checkUserEmailAvailableAction: ActionProp<string, boolean>;
  checkCompanyEmailAvailableAction: ActionProp<string, boolean>;
};

export type CompanyRegistrationTemplateProps = ComponentPropsWithoutRef<"div"> &
  Props;

export const CompanyRegistrationTemplate: FC<
  CompanyRegistrationTemplateProps
> = (props) => {
  const {
    checkCompanyEmailAvailableAction,
    checkUserEmailAvailableAction,
    registrationAction,
    className,
    ...rest
  } = props;
  const t = useTranslations("page.company-registration");

  return (
    <Grid
      {...rest}
      gap={10}
      tag="section"
      className={twMerge("w-full max-w-2xl mx-auto py-10", className)}
    >
      <Typography tag="h1" styling="xl" className="text-center">
        {t("title")}
      </Typography>
      <CompanyRegistrationForm
        onCompanyEmailAvailableRequest={
          checkCompanyEmailAvailableAction.handler
        }
        onOwnerEmailAvailableRequest={checkUserEmailAvailableAction.handler}
        onFormSubmit={registrationAction.handler}
        className="px-4 pt-6 sm:px-6  sm:py-10 border-2 rounded-2xl"
      />
      <Typography tag="p" styling="sm" className="text-center">
        {t("login.description")}{" "}
        <Link as={NextLink} to={PublicPageUrls.login} color="primary">
          {t("login.link")}
        </Link>
      </Typography>
    </Grid>
  );
};
