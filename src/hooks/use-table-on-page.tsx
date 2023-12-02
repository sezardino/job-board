import { useState } from "react";

export const useTableOnPage = () => {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");

  const onSearchChange = (value: string) => {
    setPage(0);
    setSearch(value);
  };

  const onLimitChange = (value: number) => {
    setPage(0);
    setLimit(value);
  };

  return {
    page,
    onPageChange: setPage,
    limit,
    onLimitChange,
    search,
    onSearchChange,
  };
};
