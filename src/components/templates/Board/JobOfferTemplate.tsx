import { Button, Icon, Link, Typography } from "@/components/base";
import { BaseAvatar } from "@/components/base/Avatar/BaseAvatar";
import { HTMLWrapper } from "@/components/base/HTMLWrapper/HTMLWrapper";
import { PublicPageUrls } from "@/const";
import { OneOfferResponse } from "@/services/server/modules/job-offers/scema";
import {
  BreadcrumbItem,
  Breadcrumbs,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@nextui-org/react";
import { useTranslations } from "next-intl";
import NextLink from "next/link";
import { useMemo, type ComponentPropsWithoutRef, type FC } from "react";
import { twMerge } from "tailwind-merge";

export type JobOfferTemplateProps = ComponentPropsWithoutRef<"div"> & {
  offer: OneOfferResponse;
};

export const JobOfferTemplate: FC<JobOfferTemplateProps> = (props) => {
  const { offer, className, ...rest } = props;
  const entityT = useTranslations("entity");

  const info = useMemo(
    () => [
      {
        label: "Job contract",
        value: entityT(`job-contract.${offer.contract}`),
      },

      { label: "Level", value: entityT(`seniority.${offer.level}`) },
      { label: "Type", value: entityT(`job-type.${offer.type}`) },
    ],
    [offer, entityT]
  );

  return (
    <article
      {...rest}
      className={twMerge(
        "mx-auto p-4 container md:grid md:grid-cols-[1fr,0.3fr] gap-4 items-start",
        className
      )}
    >
      <Card className="p-4 grid grid-cols-1 gap-4">
        <header className="grid grid-cols-1 gap-10">
          <Breadcrumbs>
            <BreadcrumbItem as={NextLink} href={PublicPageUrls.home}>
              Home
            </BreadcrumbItem>
            <BreadcrumbItem
              as={NextLink}
              href={PublicPageUrls.industry(offer.industry.name)}
            >
              {entityT(`industries.${offer.industry.name}`)}
            </BreadcrumbItem>
            <BreadcrumbItem
              as={NextLink}
              href={PublicPageUrls.category(
                offer.industry.name,
                offer.category.name
              )}
            >
              {entityT(`categories.${offer.category.name}`)}
            </BreadcrumbItem>
            <BreadcrumbItem>{offer.company.name}</BreadcrumbItem>
          </Breadcrumbs>
          <div className="flex items-start gap-2">
            <BaseAvatar
              type="image"
              size="lg"
              src={offer.company?.logo?.url}
              alt={offer.company.name}
            />
            <div className="grid grid-cols-1 gap-2">
              <Typography tag="h1" styling="xl" weight="bold">
                {offer.name}
              </Typography>
              <Link href={PublicPageUrls.company(offer.company.id)}>
                <Typography tag="p" styling="sm" className="text-inherit">
                  {offer.company.name}
                </Typography>
                <Icon name="HiArrowRight" size={14} className="ml-1" />
              </Link>
            </div>
          </div>
          <ul className="list-none grid grid-cols-2">
            {info.map((item) => (
              <li key={item.label} className="py-2 border-b">
                <Typography tag="p" styling="sm" className="inline">
                  {item.label} - <b>{item.value}</b>
                </Typography>
              </li>
            ))}
          </ul>
        </header>

        {/* Job Description */}
        {offer.description && <HTMLWrapper body={offer.description} />}
      </Card>

      {/* Apply Now Button */}
      <Card className="fixed bottom-0 left-0 md:sticky top-20 text-center">
        <CardHeader className="grid grid-cols-1 gap-1">
          <Typography tag="p" styling="lg" weight="bold">
            {offer.salary?.from}-{offer.salary?.to}
          </Typography>
          <Typography tag="p" styling="sm" weight="thin">
            Operating - <b>{entityT(`operating.${offer.operating}`)}</b>
          </Typography>
        </CardHeader>
        <CardBody>
          <Button>Apply now</Button>
        </CardBody>
        <CardFooter className="text-center justify-center">
          <Typography tag="p" styling="sm" weight="thin">
            <Icon name="HiCalendar" className="inline align-bottom" /> Published
            2 days ago
          </Typography>
          {/* form where user can give feedback about job offer */}
        </CardFooter>
      </Card>
    </article>
  );
};
