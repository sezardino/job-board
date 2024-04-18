import { PreviewOfferResponse } from "@/services/bll/modules/offers/schema";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { useMemo, type ComponentPropsWithoutRef, type FC } from "react";

import { Button } from "@/components/base/Button/Button";
import { Icon } from "@/components/base/Icon/Icon";
import { Typography } from "@/components/base/Typography/Typography";
import { OfferTemplateWrapper } from "@/components/modules/offer/OfferTemplateWrapper/OfferTemplateWrapper";
import { AdminPageUrls } from "@/const";
import { useTranslations } from "next-intl";

import NextLink from "next/link";

import { BreadcrumbItem } from "@/components/base/Breadcrumbs/BaseBreadcrumbs";
import styles from "./CompanyOfferTemplate.module.scss";

export type CompanyOfferTemplateProps = ComponentPropsWithoutRef<"div"> & {
  offer: PreviewOfferResponse;
  company: { id: string; name: string };
};

export const CompanyOfferTemplate: FC<CompanyOfferTemplateProps> = (props) => {
  const { company, offer } = props;
  const t = useTranslations("page.admin.company-offer");

  const breadcrumbs = useMemo<BreadcrumbItem[]>(
    () => [
      { label: t("breadcrumbs.home"), href: AdminPageUrls.home },
      { label: t("breadcrumbs.companies"), href: AdminPageUrls.companies },
      { label: company.name, href: AdminPageUrls.companyOffers(company.id) },
      { label: t("breadcrumbs.offers") },
      { label: offer.name },
    ],
    [company.id, company.name, offer.name, t]
  );

  return (
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
            {t("actions.label")}
          </CardHeader>

          <CardBody className={styles.actions}>
            <Button
              as={NextLink}
              color="primary"
              href={AdminPageUrls.applications(company.id, offer.id)}
              endContent={<Icon name="HiEye" />}
              text={t("actions.see-applications")}
            />
          </CardBody>
        </Card>
      }
    />
  );
};
