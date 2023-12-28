import { IndustryCard } from "@/components/UI/IndustriyCard/IndustryCard";
import { ActiveIndustriesResponse } from "@/services/server/modules/industries/schema";
import { useTranslations } from "next-intl";
import { type ComponentPropsWithoutRef, type FC } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  industries: ActiveIndustriesResponse["industries"];
};

export type HomeTemplateProps = ComponentPropsWithoutRef<"div"> & Props;

export const HomeTemplate: FC<HomeTemplateProps> = (props) => {
  const { industries, className, ...rest } = props;
  const industriesT = useTranslations("entity.industries");

  return (
    <section {...rest} className={twMerge(className)}>
      <ul className="list-none grid grid-cols-main-cards gap-3">
        {industries?.map((industry) => (
          <li key={industry.id} className="aspect-square">
            <IndustryCard name={industry.name} />
          </li>
        ))}
      </ul>
    </section>
  );
};
