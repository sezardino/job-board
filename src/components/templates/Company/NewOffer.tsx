import { NewOfferData, OfferForm } from "@/components/forms/Offer/OfferForm";
import { ActiveCategoriesResponse } from "@/services/server/modules/categories/schema";
import { ActiveIndustriesResponse } from "@/services/server/modules/industries/schema";
import { CreateJobOfferResponse } from "@/services/server/modules/job-offers/schema";
import { ActionProp, DataProp } from "@/types";
import { type ComponentPropsWithoutRef, type FC } from "react";

type Props = {
  industries: DataProp<ActiveIndustriesResponse>;
  categories: DataProp<ActiveCategoriesResponse>;
  onSelectIndustry: (value: string) => void;
  onCreateOfferRequest: ActionProp<
    Required<NewOfferData>,
    CreateJobOfferResponse
  >;
};

export type NewOfferTemplateProps = ComponentPropsWithoutRef<"section"> & Props;

export const NewOfferTemplate: FC<NewOfferTemplateProps> = (props) => {
  const {
    industries,
    categories,
    onSelectIndustry,
    onCreateOfferRequest,
    className,
    ...rest
  } = props;

  return (
    <section {...rest} className={className}>
      <OfferForm
        industries={industries}
        categories={categories}
        onSelectIndustry={onSelectIndustry}
        onFormSubmit={onCreateOfferRequest.handler}
        isLoading={onCreateOfferRequest.isLoading}
      />
    </section>
  );
};
