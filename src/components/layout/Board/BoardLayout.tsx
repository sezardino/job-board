"use client";

import { CategoryCard } from "@/components/UI/CategoryCard/CategoryCard";
import { LandingNavbar } from "@/components/UI/LandingNavbar/LandingNavbar";
import { useActiveCategoriesQuery } from "@/hooks/react-query/query/categories/active-categories";
import { User } from "next-auth";
import { type ComponentPropsWithoutRef, type FC } from "react";

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

  const { data: activeCategories, isFetching: isActiveCategoriesLoading } =
    useActiveCategoriesQuery(industry);

  return (
    <div
      {...rest}
      className={twMerge("container grid grid-cols-1 gap-4", className)}
    >
      <LandingNavbar user={user} onSignOutClick={onSignOutClick}>
        <ul className="py-2 flex flex-wrap items-center gap-1 list-none">
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
      </LandingNavbar>
      <main>{children}</main>
    </div>
  );
};
