import { PreviewOfferResponse } from "@/services/bll/modules/offers/schema";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { useState, type ComponentPropsWithoutRef, type FC } from "react";

import { Button } from "@/components/base/Button/Button";
import { Icon } from "@/components/base/Icon/Icon";
import { Typography } from "@/components/base/Typography/Typography";
import { OfferTemplateWrapper } from "@/components/modules/offer/OfferTemplateWrapper/OfferTemplateWrapper";
import { EditOfferWrapper } from "@/components/wrappers/EditOfferWrapper";
import { CompanyPageUrls } from "@/const";
import { useTranslations } from "next-intl";

import NextLink from "next/link";

import styles from "./ManageOfferTemplate.module.scss";

export type ManageOfferTemplateProps = ComponentPropsWithoutRef<"div"> & {
  offer: PreviewOfferResponse;
};

export const ManageOfferTemplate: FC<ManageOfferTemplateProps> = (props) => {
  const { offer } = props;
  const t = useTranslations("page.company.manage-job-offer");

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <>
      <OfferTemplateWrapper
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
                href={CompanyPageUrls.applications(offer.id)}
                endContent={<Icon name="HiEye" />}
              >
                {t("applications")}
              </Button>
            </CardBody>
          </Card>
        }
      />

      <EditOfferWrapper
        jobOfferId={isEditModalOpen ? offer.id : undefined}
        onClose={() => setIsEditModalOpen(false)}
      />
    </>
  );
};
