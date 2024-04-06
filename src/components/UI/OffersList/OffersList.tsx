import { Grid } from "@/components/base/Grid/Grid";
import { Typography } from "@/components/base/Typography/Typography";
import { FileEntity } from "@/types";
import { Card, CardBody, Skeleton } from "@nextui-org/react";
import { Seniority } from "@prisma/client";
import Link from "next/link";
import { type ComponentPropsWithoutRef, type FC } from "react";
import { twMerge } from "tailwind-merge";
import { OfferCard } from "../OfferCard/OfferCard";

export type OfferCardEntity = {
  id: string;
  name: string;
  seniority: Seniority;
  createdAt: string | Date;
  company: {
    name: string;
    logo: FileEntity | null;
  };
  salaryFrom: number | null;
  salaryTo: number | null;
  skills: { name: string }[];
};

type Props = {
  offers: OfferCardEntity[];
  isLoading?: boolean;
  linkPrefix: string;
  endContent?: { label: string; to?: string; onClick?: () => void }[];
};

export type OffersListProps = ComponentPropsWithoutRef<"ul"> & Props;

export const OffersList: FC<OffersListProps> = (props) => {
  const { isLoading, offers, endContent, linkPrefix, className, ...rest } =
    props;

  return (
    <Grid
      {...rest}
      tag="ul"
      gap={2}
      className={twMerge("list-none", className)}
    >
      {offers.map((offer) => (
        <li key={offer.id} className="h-full">
          <OfferCard
            linkPrefix={linkPrefix}
            id={offer.id}
            name={offer.name}
            companyName={offer.company.name}
            companyLogo={offer.company.logo}
            salary={
              offer.salaryFrom && offer.salaryTo
                ? { from: offer.salaryFrom, to: offer.salaryTo }
                : null
            }
            skills={offer.skills}
            createdAt={offer.createdAt as string}
          />
        </li>
      ))}

      {isLoading &&
        new Array(5)
          .fill(0)
          .map((_, i) => (
            <Skeleton key={i} as="li" className="h-28 rounded-md" />
          ))}

      {!isLoading &&
        endContent &&
        endContent.map((c, i) => (
          <li key={i}>
            <Card
              {...c}
              as={c.to ? Link : "div"}
              isPressable={!!c.to || !!c.onClick}
            >
              <CardBody className="text-center py-5">
                <Typography tag="h4" className="text-primary">
                  {c.label}
                </Typography>
              </CardBody>
            </Card>
          </li>
        ))}
    </Grid>
  );
};
