import { Icon, IconNames, Typography } from "@/components/base";
import { Card, CardBody } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { type ComponentPropsWithoutRef, type FC } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  name: string;
};

const categoriesIconMapping: Record<string, IconNames> = {
  "software-developer": "HiCode",
  "qa-engineer": "HiCheckCircle",
  "mobile-developer": "HiPhone",
  designer: "HiPencil",
  "database-administrator": "HiDatabase",
  "cybersecurity-specialist": "HiShieldCheck",
  "data-analyst": "HiChartPie",
  "devops-engineer": "HiCog",
  "systems-architect": "HiServer",
  "product-owner": "HiCube",
  "ai-ml-specialist": "TbRobot",
  "marketing-specialist": "HiChartBar",
  "advertising-manager": "HiNewspaper",
  "content-marketing-specialist": "HiDocumentText",
  "market-analyst": "HiTrendingUp",
  "financial-analyst": "HiCurrencyDollar",
  accountant: "HiCalculator",
  "financial-consultant": "HiCurrencyDollar",
  "credit-analyst": "HiCreditCard",
  "artist-designer": "TbPalette",
  "graphic-designer": "TbIcons",
  "art-director": "HiEye",
  "customer-service-specialist": "TbHeadset",
  "hairstylist-stylist": "HiScissors",
  "masseuse-masseur": "HiHand",
  "waiter-waitress": "TbCoffee",
  "tourism-manager": "TbAirTrafficControl",
  "hotel-resort-staff": "HiHome",
  "tour-guide": "HiMap",
  lawyer: "HiScale",
  attorney: "HiScale",
  "judicial-officer": "TbGavel",
  notary: "HiClipboardCheck",
  "fitness-trainer": "TbBrandRedhat",
  "sports-manager": "HiTrophy",
  physiotherapist: "HiHeart",
  "personal-trainer": "HiUser",
  journalist: "HiNewspaper",
  "tv-radio-host": "HiMicrophone",
  "content-editor": "HiDocumentText",
  screenwriter: "HiFilm",
  architect: "HiHome",
  "construction-engineer": "TbBuilding",
  "site-supervisor": "HiClipboardCheck",
  "interior-designer": "HiHome",
  chef: "TbChefHat",
  bartender: "TbGlass",
  baker: "TbBread",
};

export type CategoryCardProps = ComponentPropsWithoutRef<"article"> & Props;

export const CategoryCard: FC<CategoryCardProps> = (props) => {
  const { name, className, ...rest } = props;
  const industriesT = useTranslations("entity.categories");

  const iconName = categoriesIconMapping[name] || "HiQuestionMarkCircle";

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
        href={name}
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
