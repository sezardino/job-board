export type ActionProp<T, R = any> = {
  handler: (args: T) => Promise<R>;
  isLoading: boolean;
};

export type DataProp<T> = {
  data?: T;
  isLoading: boolean;
};

export type DataListProp = {
  limit: number;
  page: number;
  search: string;
  onLimitChange: (limit: number) => void;
  onPageChange: (page: number) => void;
  onSearchChange: (search: string) => void;
};
