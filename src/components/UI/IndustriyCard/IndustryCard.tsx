import { Icon, IconNames } from "@/components/base/Icon/Icon";
import { Typography } from "@/components/base/Typography/Typography";
import { PublicPageUrls } from "@/const";
import { Card, CardBody } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { type ComponentPropsWithoutRef, type FC } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  name: string;
};

const industryIconMapping: Record<string, IconNames> = {
  "information-technology": "HiDesktopComputer",
  "marketing-and-advertising": "HiPresentationChartBar",
  "finance-and-accounting": "HiCurrencyDollar",
  "art-and-design": "HiSparkles",
  "services-and-hospitality": "HiBriefcase",
  "tourism-and-hospitality": "HiPaperAirplane",
  "law-and-legal": "HiLibrary",
  "sports-and-fitness": "HiHeart",
  "media-and-entertainment": "HiFilm",
  "construction-and-architecture": "HiHome",
  "restaurants-and-food-service": "HiChartPie",
};

export type IndustryCardProps = ComponentPropsWithoutRef<"article"> & Props;

export const IndustryCard: FC<IndustryCardProps> = (props) => {
  const { name, className, ...rest } = props;
  const industriesT = useTranslations("entity.industries");

  const iconName = industryIconMapping[name] || "HiQuestionMarkCircle";

  return (
    // @ts-ignore
    <Card
      {...rest}
      as="div"
      isPressable
      className={twMerge("h-full group hover:bg-slate-100", className)}
    >
      <CardBody
        as={Link}
        href={PublicPageUrls.offersByIndustry(name)}
        className="grid grid-cols-1 gap-1 content-center justify-items-center"
      >
        <Icon name={iconName} size={32} />
        <Typography tag="h3" styling="sm" className="text-center">
          {industriesT(name)}
        </Typography>
      </CardBody>
    </Card>
  );
};
