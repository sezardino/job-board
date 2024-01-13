"use client";

import { ErrorTemplate } from "@/components/templates/Error/ErrorTemplate";

const ErrorPage = () => {
  return (
    <ErrorTemplate
      code={500}
      title="Something went wrong..."
      description={"Try again later"}
    />
  );
};

export default ErrorPage;
