import { ReactNode, type ComponentPropsWithoutRef, type FC } from "react";
import { twMerge } from "tailwind-merge";

import {
  OfferDetails,
  OfferDetailsProps,
} from "@/components/modules/offer/OfferDetails/OfferDetails";
import styles from "./OfferTemplateWrapper.module.scss";

type Props = {
  isLoading?: boolean;
  aside: ReactNode;
  footer?: ReactNode;
};

type PickedOfferDetailsProps = Pick<
  OfferDetailsProps,
  "company" | "skills" | "offer" | "breadcrumbs"
>;

export type OfferTemplateWrapperProps = ComponentPropsWithoutRef<"div"> &
  PickedOfferDetailsProps &
  Props;

export const OfferTemplateWrapper: FC<OfferTemplateWrapperProps> = (props) => {
  const {
    company,
    offer,
    breadcrumbs,
    skills,
    aside,
    footer,
    className,
    children,
    ...rest
  } = props;

  return (
    <div {...rest} className={twMerge(styles.element, className)}>
      <OfferDetails
        breadcrumbs={breadcrumbs}
        company={company}
        offer={offer}
        skills={skills}
      />

      <section className={styles.aside}>{aside}</section>

      {children && <div className={styles.main}>{children}</div>}
    </div>
  );
};
