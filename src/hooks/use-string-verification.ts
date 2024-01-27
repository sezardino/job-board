import { useRef } from "react";

type Args = {
  handler: (email: string) => Promise<boolean>;
  onError: () => void;
};

export const useStringVerification = (args: Args) => {
  const { handler, onError } = args;

  const history = useRef<Record<string, boolean>>({});

  const validate = async (email: string) => {
    const historyValue = history.current[email];
    if (historyValue) return historyValue;

    if (historyValue === false) {
      onError();
      return false;
    }

    const response = await handler(email);
    history.current[email] = response;

    if (response) return response;

    onError();

    return false;
  };

  return { validate };
};
