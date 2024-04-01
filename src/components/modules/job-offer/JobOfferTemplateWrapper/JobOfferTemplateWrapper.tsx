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
  "company" | "skills" | "offer" | "breadcrumbs"
>;

export type JobOfferTemplateWrapperProps = ComponentPropsWithoutRef<"div"> &
  PickedJobOfferDetailsProps &
  Props;

export const JobOfferTemplateWrapper: FC<JobOfferTemplateWrapperProps> = (
  props
) => {
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
      <JobOfferDetails
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
