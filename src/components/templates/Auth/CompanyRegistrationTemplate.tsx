import { Grid, Typography } from "@/components/base";
import { CompanyRegistrationForm } from "@/components/forms/CompanyRegistration/CompanyRegistrationForm";
import { type ComponentPropsWithoutRef, type FC } from "react";
import { twMerge } from "tailwind-merge";

export interface CompanyRegistrationTemplateProps
  extends ComponentPropsWithoutRef<"div"> {}

export const CompanyRegistrationTemplate: FC<
  CompanyRegistrationTemplateProps
> = (props) => {
  const { className, ...rest } = props;

  return (
    <Grid
      {...rest}
      gap={10}
      tag="section"
      className={twMerge("w-full max-w-2xl mx-auto py-10", className)}
    >
      <Typography tag="h1" styling="xl" className="text-center">
        Register new company
      </Typography>
      <CompanyRegistrationForm
        onCompanyEmailAvailableRequest={async () => true}
        onOwnerEmailAvailableRequest={async () => true}
        onFormSubmit={() => undefined}
        className="px-4 pt-2 sm:px-6  sm:py-4 border-2 rounded-2xl"
      />
    </Grid>
  );
};
