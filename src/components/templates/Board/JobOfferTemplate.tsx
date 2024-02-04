import { SkillCard } from "@/components/UI/SkillCard/SkillCard";
import { Button, Icon, Link, Typography } from "@/components/base";
import { BaseAvatar } from "@/components/base/Avatar/BaseAvatar";
import { BaseBreadcrumbs } from "@/components/base/Breadcrumbs/BaseBreadcrumbs";
import { HTMLWrapper } from "@/components/base/HTMLWrapper/HTMLWrapper";
import { DEFAULT_DATE_FORMAT, PublicPageUrls } from "@/const";
import { OneOfferResponse } from "@/services/server/modules/job-offers/scema";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import dayjs from "dayjs";
import { useTranslations } from "next-intl";
import { useMemo, type ComponentPropsWithoutRef, type FC } from "react";
import { twMerge } from "tailwind-merge";

export type JobOfferTemplateProps = ComponentPropsWithoutRef<"div"> & {
  offer: OneOfferResponse;
};

export const JobOfferTemplate: FC<JobOfferTemplateProps> = (props) => {
  const { offer, className, ...rest } = props;
  const entityT = useTranslations("entity");
  const t = useTranslations("components.job-offer-template");

  const info = useMemo(
    () => [
      {
        label: t("contract"),
        value: entityT(`job-contract.${offer.contract}`),
      },

      { label: t("seniority"), value: entityT(`seniority.${offer.level}`) },
      { label: t("type"), value: entityT(`job-type.${offer.type}`) },
      {
        label: t("deadline"),
        value: dayjs(offer.deadlineAt).format(DEFAULT_DATE_FORMAT),
      },
    ],
    [offer, entityT, t]
  );

  const published = useMemo(() => {
    const days = dayjs(offer.publishedAt).diff(dayjs(), "day");

    if (days === 0) {
      return t("publication.today");
    }

    if (days === 1) {
      return t("publication.yesterday");
    }

    if (days > 1 && days < 7) {
      return t("publication.days-ago", { value: days });
    }

    return dayjs(offer.publishedAt).format(DEFAULT_DATE_FORMAT);
  }, [offer.publishedAt, t]);

  const breadcrumbs = useMemo(
    () => [
      { href: PublicPageUrls.home, label: t("home") },
      {
        href: PublicPageUrls.industry(offer.industry.name),
        label: entityT(`industries.${offer.industry.name}`),
      },

      {
        href: PublicPageUrls.category(offer.industry.name, offer.category.name),
        label: entityT(`categories.${offer.category.name}`),
      },

      { label: offer.company.name },
    ],
    [entityT, offer.category.name, offer.company.name, offer.industry.name, t]
  );

  return (
    <section
      {...rest}
      className={twMerge(
        "mx-auto p-4 container md:grid md:grid-cols-[1fr,0.4fr] gap-4 items-start",
        className
      )}
    >
      <Card className="p-4 grid grid-cols-1 gap-4">
        <header className="grid grid-cols-1 gap-10">
          <BaseBreadcrumbs items={breadcrumbs} />

          <div className="flex items-start gap-2">
            <BaseAvatar
              type="image"
              size="lg"
              src={offer.company?.logo?.url}
              alt={offer.company.name}
            />

            <div className="grid grid-cols-1 gap-1">
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

          <ul className="grid gap-1 grid-cols-[repeat(auto-fill,minmax(200px,1fr))]">
            {offer.skills.map((skill, index) => (
              <SkillCard
                as="li"
                key={`${skill.name}-${skill.level}-${index}`}
                name={skill.name}
                level={skill.level}
              ></SkillCard>
            ))}
          </ul>
        </header>

        {/* Job Description */}
        {offer.description && <HTMLWrapper body={offer.description} />}
      </Card>

      {/* Apply Now Button */}
      <Card className="z-10 fixed bottom-0 left-0 right-0 md:sticky md:top-20 text-center">
        <CardHeader className="grid grid-cols-1 gap-1">
          <Typography tag="p" styling="lg" weight="bold">
            {offer.salary?.from}-{offer.salary?.to}
          </Typography>

          <Typography tag="p" styling="sm" weight="thin">
            {t("operating")} - <b>{entityT(`operating.${offer.operating}`)}</b>
          </Typography>
        </CardHeader>

        <CardBody>
          <Button color="primary">{t("apply")}</Button>
        </CardBody>

        <CardFooter className="text-center justify-center">
          <Typography tag="p" styling="sm" weight="thin">
            <Icon name="HiCalendar" className="inline align-bottom" />
            {t("publication.label")}
            <b>{published}</b>
          </Typography>
          {/* form where user can give feedback about job offer */}
        </CardFooter>
      </Card>
    </section>
  );
};
