export type ActionProp<T, R = any> = {
  handler: (args: T) => Promise<R>;
  isLoading: boolean;
};

export type DataProp<T> = {
  data?: T;
  isLoading: boolean;
};
