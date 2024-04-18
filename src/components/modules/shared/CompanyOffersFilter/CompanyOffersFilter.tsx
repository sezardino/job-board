import { ComponentPropsWithoutRef, FC, useMemo } from "react";

import { SearchForm } from "@/components/base/SearchForm/SearchForm";
import { Select, SelectOption } from "@/components/base/Select/Select";
import { OfferStatus, Seniority } from "@prisma/client";
import { useTranslations } from "next-intl";
import { twMerge } from "tailwind-merge";
import styles from "./CompanyOffersFilter.module.scss";

export type OfferFilterSeniority = Seniority | "all";
export type OfferFilterStatus = OfferStatus | "all";

type Props = {
  isAdmin?: boolean;
  onSearchChange: (value: string) => void;
  statusFilter: {
    value: OfferFilterStatus;
    onChange: (value: OfferFilterStatus) => void;
  };
  seniorityFilter: {
    value: OfferFilterSeniority;
    onChange: (value: OfferFilterSeniority) => void;
  };
};

export type CompanyOffersFilterProps = ComponentPropsWithoutRef<"div"> & Props;

export const CompanyOffersFilter: FC<CompanyOffersFilterProps> = (props) => {
  const {
    isAdmin,
    onSearchChange,
    seniorityFilter,
    statusFilter,
    children,
    className,
    ...rest
  } = props;

  const t = useTranslations("components.shared.company-offers-filter");
  const entityT = useTranslations("entity");

  const statusFilterOptions = useMemo<SelectOption<OfferFilterStatus>[]>(() => {
    const options: SelectOption<OfferFilterStatus>[] = [
      {
        id: "all",
        label: t("filters.all"),
      },
      {
        id: OfferStatus.ACTIVE,
        label: entityT(`offers.status.${OfferStatus.ACTIVE}`),
      },
      {
        id: OfferStatus.DRAFT,
        label: entityT(`offers.status.${OfferStatus.DRAFT}`),
      },
      {
        id: OfferStatus.FINISHED,
        label: entityT(`offers.status.${OfferStatus.FINISHED}`),
      },
      {
        id: OfferStatus.ARCHIVED,
        label: entityT(`offers.status.${OfferStatus.ARCHIVED}`),
      },
    ];

    if (isAdmin)
      options.push({
        id: OfferStatus.INACTIVE,
        label: entityT(`offers.status.${OfferStatus.INACTIVE}`),
      });

    return options;
  }, [entityT, isAdmin, t]);

  const seniorityFilterOptions = useMemo<
    SelectOption<OfferFilterSeniority>[]
  >(() => {
    return [
      {
        id: "all",
        label: t("filters.all"),
      },
      {
        id: Seniority.INTERN,
        label: entityT(`offers.seniority.${Seniority.INTERN}`),
      },
      {
        id: Seniority.JUNIOR,
        label: entityT(`offers.seniority.${Seniority.JUNIOR}`),
      },
      {
        id: Seniority.MID,
        label: entityT(`offers.seniority.${Seniority.MID}`),
      },
      {
        id: Seniority.SENIOR,
        label: entityT(`offers.seniority.${Seniority.SENIOR}`),
      },
      {
        id: Seniority.EXPERT,
        label: entityT(`offers.seniority.${Seniority.EXPERT}`),
      },
    ];
  }, [entityT, t]);

  return (
    <div {...rest} className={twMerge(styles.element, className)}>
      <div className={styles.search}>
        <SearchForm placeholder={t("search")} onSearch={onSearchChange} />

        <Select
          options={statusFilterOptions}
          value={statusFilter.value}
          defaultSelectedKeys={[statusFilter.value]}
          isMultiple={false}
          onSelectChange={statusFilter.onChange}
          placeholder={t("filters.status")}
          aria-label={t("filters.status")}
          className={styles.filter}
        />
        <Select
          options={seniorityFilterOptions}
          value={seniorityFilter.value}
          defaultSelectedKeys={[seniorityFilter.value]}
          isMultiple={false}
          onSelectChange={seniorityFilter.onChange}
          placeholder={t("filters.seniority")}
          aria-label={t("filters.seniority")}
          className={styles.filter}
        />
      </div>
      {children}
    </div>
  );
};
