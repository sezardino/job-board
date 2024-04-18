import { PreviewOfferResponse } from "@/services/bll/modules/offers/schema";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import {
  useMemo,
  useState,
  type ComponentPropsWithoutRef,
  type FC,
} from "react";

import { Button } from "@/components/base/Button/Button";
import { Icon } from "@/components/base/Icon/Icon";
import { Typography } from "@/components/base/Typography/Typography";
import { OfferTemplateWrapper } from "@/components/modules/offer/OfferTemplateWrapper/OfferTemplateWrapper";
import { EditOfferWrapper } from "@/components/wrappers/EditOfferWrapper";
import { CompanyPageUrls } from "@/const";
import { useTranslations } from "next-intl";

import NextLink from "next/link";

import { BreadcrumbItem } from "@/components/base/Breadcrumbs/BaseBreadcrumbs";
import styles from "./ManageOfferTemplate.module.scss";

export type ManageOfferTemplateProps = ComponentPropsWithoutRef<"div"> & {
  offer: PreviewOfferResponse;
  companyName: string;
};

export const ManageOfferTemplate: FC<ManageOfferTemplateProps> = (props) => {
  const { companyName, offer } = props;
  const t = useTranslations("page.company.manage-offer");

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const breadcrumbs = useMemo<BreadcrumbItem[]>(
    () => [
      { label: companyName, href: CompanyPageUrls.home },
      { label: t("offers"), href: CompanyPageUrls.offers },
      { label: offer.name },
    ],
    [companyName, offer.name, t]
  );

  return (
    <>
      <OfferTemplateWrapper
        breadcrumbs={breadcrumbs}
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
          operating: offer.operating,
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
                text={t("edit")}
              />
              <Button
                as={NextLink}
                color="primary"
                href={CompanyPageUrls.applications(offer.id)}
                endContent={<Icon name="HiEye" />}
                text={t("applications")}
              />
            </CardBody>
          </Card>
        }
      />

      <EditOfferWrapper
        offerId={isEditModalOpen ? offer.id : undefined}
        onClose={() => setIsEditModalOpen(false)}
      />
    </>
  );
};
