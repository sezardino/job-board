import { IndustryCard } from "@/components/UI/IndustriyCard/IndustryCard";
import { ActiveIndustriesResponse } from "@/services/bll/modules/industries/schema";
import { type ComponentPropsWithoutRef, type FC } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  industries: ActiveIndustriesResponse["data"];
};

export type HomeTemplateProps = ComponentPropsWithoutRef<"div"> & Props;

export const HomeTemplate: FC<HomeTemplateProps> = (props) => {
  const { industries, className, ...rest } = props;

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
