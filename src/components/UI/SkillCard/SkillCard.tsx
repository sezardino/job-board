import { Typography } from "@/components/base/Typography/Typography";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { SkillLevel } from "@prisma/client";
import { useTranslations } from "next-intl";
import { ElementType, type ComponentPropsWithoutRef, type FC } from "react";
import { twMerge } from "tailwind-merge";

export type SkillCardProps = ComponentPropsWithoutRef<ElementType> & {
  name: string;
  level: SkillLevel;
};

const LevelIndex: Record<SkillLevel, number> = {
  NICE_TO_HAVE: 1,
  BASIC: 2,
  MEDIUM: 3,
  ADVANCED: 4,
  EXPERT: 5,
};

export const SkillCard: FC<SkillCardProps> = (props) => {
  const { name, level, className, ...rest } = props;
  const levelT = useTranslations("entity.offers.skill-level");

  return (
    <Card
      {...rest}
      className={twMerge("shadow-none grid grid-cols-1 gap-1", className)}
    >
      <CardHeader className="pb-0">
        <Typography tag="h4" styling="sm">
          {name}
        </Typography>
      </CardHeader>

      <CardBody className="pt-0">
        <Typography tag="p" styling="xs" color="default-500">
          {levelT(level)}
        </Typography>

        <ul className="flex items-center gap-1 list-none">
          {new Array(5).fill(0).map((_, index) => (
            <li
              key={index}
              className={twMerge(
                "w-4 h-4 rounded-full border bg-slate-200",
                index < LevelIndex[level] && "bg-purple-500"
              )}
            />
          ))}
        </ul>
      </CardBody>
    </Card>
  );
};
