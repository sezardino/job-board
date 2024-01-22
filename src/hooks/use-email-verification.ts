import { useRef } from "react";

type Args = {
  handler: (email: string) => Promise<boolean>;
  onError: () => void;
};

export const useEmailVerification = (args: Args) => {
  const { handler, onError } = args;

  const checkEmailHistory = useRef<Record<string, boolean>>({});

  const validate = async (email: string) => {
    const historyValue = checkEmailHistory.current[email];
    if (historyValue) return historyValue;

    if (historyValue === false) {
      onError();
      return false;
    }

    const response = await handler(email);
    checkEmailHistory.current[email] = response;

    if (response) return response;

    onError();

    return false;
  };

  return { validate };
};
