"use client";

import { CategoryCard } from "@/components/UI/CategoryCard/CategoryCard";
import { useActiveCategoriesQuery } from "@/hooks/react-query/query/categories/active-categories";
import { PropsWithChildren, type FC } from "react";

type Props = {
  params: {
    industry: string;
  };
};

const BoardLayout: FC<PropsWithChildren & Props> = (props) => {
  const { children, params } = props;

  const { data: activeCategories, isFetching: isActiveCategoriesLoading } =
    useActiveCategoriesQuery(params.industry);

  return (
    <div className="grid grid-cols-1 gap-4">
      <ul className="grid grid-cols-main-cards gap-1 list-none">
        {activeCategories?.data.map((category) => (
          <li key={category.id}>
            <CategoryCard name={category.name} />
          </li>
        ))}
      </ul>
      <main>{children}</main>
    </div>
  );
};

export default BoardLayout;
