import { useEffect, useState } from "react";

type Args = {
  initialCount?: number;
  initialActive?: boolean;
};

const useTimer = (args: Args) => {
  const { initialActive = false, initialCount = 60 } = args;

  const [left, setLeft] = useState(initialCount);
  const [isActive, setIsActive] = useState(initialActive);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setLeft(initialCount);
  };

  const startTimer = () => {
    if (!isActive) {
      setLeft(initialCount);
      setIsActive(true);
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && left > 0) {
      interval = setInterval(() => {
        setLeft((prevLeft) => prevLeft - 1);
      }, 1000);
    } else if (left === 0) {
      setIsActive(false);
    }

    return () => clearInterval(interval);
  }, [isActive, left, initialCount]);

  return { left, isActive, toggleTimer, resetTimer, startTimer };
};

export default useTimer;
