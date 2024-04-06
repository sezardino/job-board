import { Grid } from "@/components/base/Grid/Grid";
import { FileEntity } from "@/types";
import { Skeleton } from "@nextui-org/react";
import { Seniority } from "@prisma/client";
import { type ComponentPropsWithoutRef, type FC } from "react";
import { twMerge } from "tailwind-merge";
import { OfferCard } from "../OfferCard/OfferCard";

import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import styles from "./OffersList.module.scss";

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
  hasNextPage?: boolean;
  fetchNextPage?: () => void;
  isFetching?: boolean;
  isFetchingNextPage?: boolean;
  linkPrefix: string;
};

export type OffersListProps = ComponentPropsWithoutRef<"ul"> & Props;

export const OffersList: FC<OffersListProps> = (props) => {
  const {
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    offers,
    linkPrefix,
    className,
    ...rest
  } = props;

  const observerRef = useIntersectionObserver<HTMLLIElement>({
    onIntersecting: fetchNextPage || (() => {}),
  });

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

      {isFetching &&
        new Array(5)
          .fill(0)
          .map((_, i) => (
            <Skeleton key={i} as="li" className="h-28 rounded-md" />
          ))}

      <li
        ref={observerRef}
        className={twMerge(
          styles.observer,
          (!hasNextPage || isFetchingNextPage) && "hidden"
        )}
      />
    </Grid>
  );
};
