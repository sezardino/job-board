"use client";

import { LoadingOverlay } from "@/components/base/LoadingOverlay/LoadingOverlay";
import { CompanyProfileTemplate } from "@/components/templates/Shared/CompanyProfileTemplate";
import { CompanyPageUrls } from "@/const";
import { useCompanyPagesContext } from "@/context";
import { useCompanyProfileQuery } from "@/hooks";
import { useEditMyCompanyMutation } from "@/hooks/react-query/mutation/companies";
import { useOffersListInfiniteQuery } from "@/hooks/react-query/query/offers";

const CompanyProfilePage = () => {
  const { id } = useCompanyPagesContext();
  const companyProfile = useCompanyProfileQuery({});

  const { mutateAsync: editCompany, isPending: isEditLoading } =
    useEditMyCompanyMutation();
  const offersQuery = useOffersListInfiniteQuery({ companyId: id });

  const isLoading = companyProfile.isFetching;

  return (
    <>
      {isLoading && <LoadingOverlay />}
      <CompanyProfileTemplate
        offerLinkPrefix={CompanyPageUrls.offers}
        profile={companyProfile}
        offers={offersQuery}
        editAction={{
          handler: editCompany,
          isLoading: isEditLoading,
        }}
      />
    </>
  );
};

export default CompanyProfilePage;
