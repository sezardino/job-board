import { PreviewJobOfferResponse } from "@/services/bll/modules/job-offers/schema";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { useState, type ComponentPropsWithoutRef, type FC } from "react";

import { Button, Icon, Typography } from "@/components/base";
import { JobOfferTemplateWrapper } from "@/components/modules/job-offer/JobOfferTemplateWrapper/JobOfferTemplateWrapper";
import { EditJobOfferWrapper } from "@/components/wrappers/EditJobOfferWrapper";
import { useTranslations } from "next-intl";

export type ManageJobOfferTemplateProps = ComponentPropsWithoutRef<"div"> & {
  offer: PreviewJobOfferResponse;
};

export const ManageJobOfferTemplate: FC<ManageJobOfferTemplateProps> = (
  props
) => {
  const { offer } = props;
  const t = useTranslations("templates.company.manage-job-offer");

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <>
      <JobOfferTemplateWrapper
        company={{
          id: offer.company.id,
          name: offer.company.name,
          logo: { url: offer.company.logo?.url || "" },
        }}
        offer={{
          name: offer.name,
          description: offer.description || "",
          contract: offer.contract,
          seniority: offer.seniority,
          type: offer.type,
        }}
        skills={offer.skills}
        aside={
          <Card as="section">
            <CardHeader as={Typography} styling="md" tag="h2">
              {t("manage")}
            </CardHeader>

            <CardBody>
              <Button onClick={() => setIsEditModalOpen(true)}>
                <Icon name="HiPencilAlt" />
                {t("edit")}
              </Button>
            </CardBody>
          </Card>
        }
      />

      <EditJobOfferWrapper
        jobOfferId={isEditModalOpen ? offer.id : undefined}
        onClose={() => setIsEditModalOpen(false)}
      />
    </>
  );
};
