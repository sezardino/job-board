export type ActionProp<T, R = any> = {
  handler: (args: T) => Promise<R>;
  isLoading: boolean;
};

export type DataProp<T> = {
  data?: T;
  isLoading: boolean;
};

export type QueryProps<T> = {
  data?: T;
  isFetching: boolean;
};

export type InfiniteDataProp<T> = {
  data?: T;
  isFetching: boolean;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
};

export type DataListProp = {
  limit: number;
  page: number;
  search: string;
  onLimitChange: (limit: number) => void;
  onPageChange: (page: number) => void;
  onSearchChange: (search: string) => void;
};
