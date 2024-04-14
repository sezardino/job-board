import { TitleDescription } from "@/components/UI/TitleDescription/TitleDescription";
import { Grid } from "@/components/base/Grid/Grid";
import { ComponentPropsWithoutRef, FC } from "react";

import {
  BaseBreadcrumbs,
  BreadcrumbItem,
} from "@/components/base/Breadcrumbs/BaseBreadcrumbs";
import styles from "./PreviewTemplateWrapper.module.scss";

type Props = {
  copy: {
    title: string;
    description?: string;
  };
  search?: JSX.Element;
  breadcrumbs?: BreadcrumbItem[];
};

export type PreviewTemplateWrapperProps = ComponentPropsWithoutRef<"section"> &
  Props;

export const PreviewTemplateWrapper: FC<PreviewTemplateWrapperProps> = (
  props
) => {
  const { copy, search, breadcrumbs, children, ...rest } = props;

  return (
    <Grid {...rest} tag="section" gap={4}>
      <Grid gap={1}>
        {breadcrumbs && (
          <BaseBreadcrumbs items={breadcrumbs} className={styles.breadcrumbs} />
        )}

        <div className={styles.wrapper}>
          <TitleDescription
            title={copy.title}
            titleLevel="h1"
            description={copy.description}
          />

          {search}
        </div>
      </Grid>

      {children}
    </Grid>
  );
};
