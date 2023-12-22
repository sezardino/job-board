import { Context, useContext } from "react";

export const useCreateContext = <C>(Context: Context<C>) => {
  const context = useContext(Context);

  if (!context) {
    throw new Error(
      `${Context.displayName} must be used within a ${Context.displayName}Provider`
    );
  }
  return context;
};
