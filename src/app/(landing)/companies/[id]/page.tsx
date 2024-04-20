"use client";

import { CompanyProfileTemplate } from "@/components/templates/Company/CompanyProfileTemplate";
import { PublicPageUrls } from "@/const";
import { useCompanyProfileQuery } from "@/hooks";
import { useOffersListInfiniteQuery } from "@/hooks/react-query/query/offers";

type CompanyProfileProps = {
  params: {
    id: string;
  };
};

const CompanyProfilePage = (props: CompanyProfileProps) => {
  const {
    params: { id },
  } = props;

  const companyProfile = useCompanyProfileQuery({});
  const offersQuery = useOffersListInfiniteQuery({ companyId: id });

  return (
    <>
      <CompanyProfileTemplate
        offerLinkPrefix={PublicPageUrls.offer("")}
        profile={companyProfile}
        offers={offersQuery}
      />
    </>
  );
};

export default CompanyProfilePage;
