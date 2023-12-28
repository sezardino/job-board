import { Grid, Typography } from "@/components/base";
import { FileEntity } from "@/types";
import { Card, CardBody } from "@nextui-org/react";
import { Seniority } from "@prisma/client";
import Link from "next/link";
import { type ComponentPropsWithoutRef, type FC } from "react";
import { twMerge } from "tailwind-merge";
import { OfferCard } from "../OfferCard/OfferCard";

export type OfferCardEntity = {
  id: string;
  name: string;
  level: Seniority;
  createdAt: string | Date;
  company: {
    name: string;
    logo: FileEntity | null;
  };
  salary: {
    from: number;
    to: number;
  };
  skills: { name: string }[];
};

type Props = {
  offers: OfferCardEntity[];
  linkPrefix: string;
  endContent?: { label: string; to?: string }[];
};

export type OffersListProps = ComponentPropsWithoutRef<"ul"> & Props;

export const OffersList: FC<OffersListProps> = (props) => {
  const { offers, endContent, linkPrefix, className, ...rest } = props;

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
            salary={offer.salary}
            skills={offer.skills}
            createdAt={offer.createdAt as string}
          />
        </li>
      ))}
      {endContent &&
        endContent.map((c, i) => (
          <li key={i}>
            <Card
              as={c.to ? Link : "div"}
              {...{ href: c.to ? c.to : undefined }}
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
