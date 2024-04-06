import { PreviewJobOfferResponse } from "@/services/bll/modules/job-offers/schema";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { useState, type ComponentPropsWithoutRef, type FC } from "react";

import { Button } from "@/components/base/Button/Button";
import { Icon } from "@/components/base/Icon/Icon";
import { Typography } from "@/components/base/Typography/Typography";
import { JobOfferTemplateWrapper } from "@/components/modules/job-offer/JobOfferTemplateWrapper/JobOfferTemplateWrapper";
import { EditJobOfferWrapper } from "@/components/wrappers/EditJobOfferWrapper";
import { CompanyPageUrls } from "@/const";
import { useTranslations } from "next-intl";

import NextLink from "next/link";

import styles from "./ManageJobOfferTemplate.module.scss";

export type ManageJobOfferTemplateProps = ComponentPropsWithoutRef<"div"> & {
  offer: PreviewJobOfferResponse;
};

export const ManageJobOfferTemplate: FC<ManageJobOfferTemplateProps> = (
  props
) => {
  const { offer } = props;
  const t = useTranslations("page.company.manage-job-offer");

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

            <CardBody className={styles.actions}>
              <Button
                color="secondary"
                onClick={() => setIsEditModalOpen(true)}
                endContent={<Icon name="HiPencilAlt" />}
              >
                {t("edit")}
              </Button>
              <Button
                as={NextLink}
                color="primary"
                href={CompanyPageUrls.jobOfferApplications(offer.id)}
                endContent={<Icon name="HiEye" />}
              >
                {t("applications")}
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
