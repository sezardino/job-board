"use client";

import { ErrorTemplate } from "@/components/templates/Error/ErrorTemplate";
import { PublicPageUrls } from "@/const";

const NotFoundPage = () => {
  return (
    <ErrorTemplate
      code={404}
      title="Something's missing."
      description="Sorry, we can't find that page. You'll find lots to explore on the
  home page."
      action={{ text: "To home page", href: PublicPageUrls.home }}
    />
  );
};

export default NotFoundPage;
