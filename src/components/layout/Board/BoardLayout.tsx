"use client";

import { CategoryCard } from "@/components/UI/CategoryCard/CategoryCard";
import { useActiveCategoriesQuery } from "@/hooks/react-query/query/categories/active-categories";
import { type ComponentPropsWithoutRef, type FC } from "react";

import { twMerge } from "tailwind-merge";

type Props = {
  activeCategory?: string;
  industry: string;
};

export type BoardLayoutProps = ComponentPropsWithoutRef<"div"> & Props;

export const BoardLayoutWrapper: FC<BoardLayoutProps> = (props) => {
  const { industry, activeCategory, className, children, ...rest } = props;

  const { data: activeCategories, isFetching: isActiveCategoriesLoading } =
    useActiveCategoriesQuery(industry);

  return (
    <div {...rest} className={twMerge("grid grid-cols-1 gap-4", className)}>
      <ul className="flex flex-wrap items-center gap-1 list-none">
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
      <main className="container">{children}</main>
    </div>
  );
};
