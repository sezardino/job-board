import { SkillCard } from "@/components/UI/SkillCard/SkillCard";
import { TitleDescription } from "@/components/UI/TitleDescription/TitleDescription";
import { Grid } from "@/components/base/Grid/Grid";
import { Typography } from "@/components/base/Typography/Typography";
import { SkillLevel } from "@prisma/client";
import { ComponentPropsWithoutRef } from "react";

import { Skeleton } from "@nextui-org/react";
import styles from "./SkillsList.module.scss";

type Props = {
  title: string;
  description?: string;
  noData: string;
  isLoading?: boolean;
  skills?: { name: string; level: SkillLevel }[];
};

export type SkillsListProps = ComponentPropsWithoutRef<"div"> & Props;

export const SkillsList = (props: SkillsListProps) => {
  const { title, description, noData, isLoading, skills, ...rest } = props;

  return (
    <Grid {...rest} gap={5}>
      <TitleDescription
        titleLevel="h3"
        title={title}
        description={description}
      />

      {!skills?.length && !isLoading && (
        <Typography tag="p">{noData}</Typography>
      )}

      <ul className={styles.list}>
        {skills?.map((skill, index) => (
          <SkillCard
            as="li"
            key={`${skill.name}-${skill.level}-${index}`}
            name={skill.name}
            level={skill.level}
          />
        ))}
        {isLoading &&
          new Array(6).fill(null).map((_, index) => (
            <Skeleton key={index}>
              <SkillCard
                as="li"
                name={index.toString()}
                level={SkillLevel.ADVANCED}
              />
            </Skeleton>
          ))}
      </ul>
    </Grid>
  );
};
