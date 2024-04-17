"use client";

import { useAdminOffersListQuery } from "@/hooks/react-query/query/offers";
import { useDataOnPage } from "@/hooks/use-data-on-page";

type Props = {
  params: { industryId: string; categoryId: string };
};

const CategoriesPage = (props: Props) => {
  const { industryId, categoryId } = props.params;

  const { limit, onLimitChange, onPageChange, onSearchChange, page, search } =
    useDataOnPage();
  const { data: offers, isFetching: isOffersLoading } = useAdminOffersListQuery(
    { limit, page, search, industryId, categoryId }
  );

  return <div>{JSON.stringify(offers)}</div>;
};

export default CategoriesPage;
