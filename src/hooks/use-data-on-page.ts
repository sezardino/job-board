import { useState } from "react";

type Args = {
  page?: number;
  limit?: number;
  search?: string;
};

export const useDataOnPage = (props: Args = {}) => {
  const { page = 0, limit = 10, search = "" } = props;

  const [pageParam, setPage] = useState(page);
  const [limitParam, setLimit] = useState(limit);
  const [searchParam, setSearch] = useState(search);

  const onElseChange = <T>(value: T, setter: (value: T) => void) => {
    setPage(0);
    setter(value);
  };

  const onSearchChange = (value: string) => onElseChange(value, setSearch);

  const onLimitChange = (value: number) => onElseChange(value, setLimit);

  return {
    page: pageParam,
    onPageChange: setPage,
    limit: limitParam,
    onLimitChange,
    search: searchParam,
    onSearchChange,
    changeHandler: onElseChange,
  };
};
