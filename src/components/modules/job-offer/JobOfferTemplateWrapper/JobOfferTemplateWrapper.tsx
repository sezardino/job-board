import { ReactNode, type ComponentPropsWithoutRef, type FC } from "react";
import { twMerge } from "tailwind-merge";

import {
  JobOfferDetails,
  JobOfferDetailsProps,
} from "@/components/modules/job-offer/JobOfferDetails/JobOfferDetails";
import styles from "./JobOfferTemplateWrapper.module.scss";

type Props = {
  aside: ReactNode;
  footer?: ReactNode;
};

type PickedJobOfferDetailsProps = Pick<
  JobOfferDetailsProps,
  "company" | "info" | "skills" | "offer" | "breadcrumbs"
>;

export type JobOfferTemplateWrapperProps = ComponentPropsWithoutRef<"div"> &
  PickedJobOfferDetailsProps &
  Props;

export const JobOfferTemplateWrapper: FC<JobOfferTemplateWrapperProps> = (
  props
) => {
  const {
    info,
    company,
    offer,
    breadcrumbs,
    skills,
    aside,
    footer,
    className,
    ...rest
  } = props;

  return (
    <div {...rest} className={twMerge(styles.element, className)}>
      <JobOfferDetails
        breadcrumbs={breadcrumbs}
        company={company}
        info={info}
        offer={offer}
        skills={skills}
      />

      <section className={styles.aside}>{aside}</section>

      <section className={styles.footer}>{footer}</section>
    </div>
  );
};
