import { OfferForm } from "@/components/forms/Offer/OfferForm";
import { ActiveCategoriesResponse } from "@/services/server/modules/categories/schema";
import { ActiveIndustriesResponse } from "@/services/server/modules/industries/schema";
import { DataProp } from "@/types";
import { type ComponentPropsWithoutRef, type FC } from "react";

type Props = {
  industries: DataProp<ActiveIndustriesResponse>;
  categories: DataProp<ActiveCategoriesResponse>;
  onSelectIndustry: (value: string) => void;
};

export type NewOfferTemplateProps = ComponentPropsWithoutRef<"section"> & Props;

export const NewOfferTemplate: FC<NewOfferTemplateProps> = (props) => {
  const { industries, categories, onSelectIndustry, className, ...rest } =
    props;

  return (
    <section {...rest} className={className}>
      <OfferForm
        industries={industries}
        categories={categories}
        onSelectIndustry={onSelectIndustry}
      />
    </section>
  );
};
