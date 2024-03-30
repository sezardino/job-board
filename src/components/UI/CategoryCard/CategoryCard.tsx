import { Button } from "@/components/base/Button/Button";
import { Icon, IconNames } from "@/components/base/Icon/Icon";
import { Tooltip } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { type ComponentPropsWithoutRef, type FC } from "react";

type Props = {
  name: string;
  prefix?: string;
  isActive: boolean;
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

export type CategoryCardProps = Omit<
  ComponentPropsWithoutRef<"button">,
  "onFocus" | "onBlur" | "color"
> &
  Props;

export const CategoryCard: FC<CategoryCardProps> = (props) => {
  const { name, prefix, isActive, className, ...rest } = props;
  const categoryT = useTranslations("entity.categories");

  const iconName = categoriesIconMapping[name] || "HiQuestionMarkCircle";

  return (
    <Tooltip content={categoryT(name)}>
      <Button
        {...rest}
        isIconOnly
        as={Link}
        href={prefix ? prefix + "/" + name : name}
        color={isActive ? "primary" : undefined}
      >
        <Icon name={iconName} size={24} />
      </Button>
    </Tooltip>
  );
};
