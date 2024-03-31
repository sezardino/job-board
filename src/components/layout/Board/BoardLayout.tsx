"use client";

import { CategoryCard } from "@/components/UI/CategoryCard/CategoryCard";
import { LandingNavbar } from "@/components/UI/LandingNavbar/LandingNavbar";
import { useActiveCategoriesQuery } from "@/hooks/react-query/query/categories/active-categories";
import { User } from "next-auth";
import { type ComponentPropsWithoutRef, type FC } from "react";

import styles from "./BoardLayout.module.scss";

import { SearchForm } from "@/components/base/SearchForm/SearchForm";
import { twMerge } from "tailwind-merge";

type Props = {
  user?: User;
  onSignOutClick: () => void;
  activeCategory?: string;
  industry: string;
};

export type BoardLayoutProps = ComponentPropsWithoutRef<"div"> & Props;

export const BoardLayoutWrapper: FC<BoardLayoutProps> = (props) => {
  const {
    user,
    onSignOutClick,
    industry,
    activeCategory,
    className,
    children,
    ...rest
  } = props;

  const {
    data: activeCategories,
    isInitialLoading: isActiveCategoriesLoading,
  } = useActiveCategoriesQuery(industry);

  return (
    <div {...rest} className={twMerge(styles.element, className)}>
      <LandingNavbar user={user} onSignOutClick={onSignOutClick}>
        <div className={styles.wrapper}>
          <ul className={styles.list}>
            {/* {isActiveCategoriesLoading &&
              new Array(10)
                .fill(null)
                .map((_, index) => (
                  <Skeleton key={index} className={styles.skeleton} />
                ))} */}

            {activeCategories?.data.map((category) => (
              <li key={category.id}>
                <CategoryCard
                  name={category.name}
                  prefix={activeCategory ? undefined : industry}
                  isActive={activeCategory === category.name}
                />
              </li>
            ))}
          </ul>

          <SearchForm
            onSearch={() => undefined}
            type="submit"
            className="max-w-80"
          />
        </div>
      </LandingNavbar>
      <main className="container">{children}</main>
    </div>
  );
};
