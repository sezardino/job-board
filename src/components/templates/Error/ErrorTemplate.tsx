import { Button } from "@/components/base/Button/Button";
import { Grid } from "@/components/base/Grid/Grid";
import { Typography } from "@/components/base/Typography/Typography";
import Link from "next/link";
import { type FC } from "react";

export type ErrorTemplateProps = {
  code: number;
  title: string;
  description: string;
  action?: { text: string; href: string };
};

export const ErrorTemplate: FC<ErrorTemplateProps> = (props) => {
  const { action, code, description, title } = props;

  return (
    <main className="min-h-screen flex justify-center items-center">
      <Grid gap={8} tag="section" className="container">
        <Grid gap={4} className="text-center">
          <Typography tag="h1" styling="7xl" weight="bold" color="primary">
            {code}
          </Typography>

          <Typography tag="p" styling="3xl" weight="bold">
            {title}
          </Typography>

          <Typography tag="p" styling="lg" color="default-500">
            {description}
          </Typography>
        </Grid>

        {action && (
          <Button
            as={Link}
            size="lg"
            color="primary"
            href={action.href}
            className="justify-self-center"
          >
            {action.text}
          </Button>
        )}
      </Grid>
    </main>
  );
};
