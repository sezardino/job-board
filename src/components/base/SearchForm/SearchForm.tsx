import {
  FormEvent,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type FC,
} from "react";

import { useDebouncedValue, useWatchEffect } from "@/hooks";

import { Icon } from "@/components/base/Icon/Icon";
import { Input } from "../Input/Input";

export interface SearchFormProps
  extends Omit<ComponentPropsWithoutRef<"form">, "onSubmit"> {
  placeholder?: string;
  onSearch: (value: string) => void;
  initialValue?: string;
  iconPosition?: "left" | "right";
  type?: "live" | "submit";
}

const MIN_SEARCH_LENGTH = 3;

export const SearchForm: FC<SearchFormProps> = (props) => {
  const {
    iconPosition = "left",
    onSearch,
    placeholder,
    type = "live",
    className,
    initialValue = "",
    ...rest
  } = props;
  const [value, setValue] = useState<string>(initialValue);
  const [debouncedValue] = useDebouncedValue(value, 500);

  const isSubmitted = useRef(false);
  const submitResetTimer = useRef<NodeJS.Timeout | null>(null);
  const prevSubmittedValue = useRef<string>("");

  const submitHandler = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (type === "live") {
      if (isSubmitted.current) return;
      if (value.length < MIN_SEARCH_LENGTH) return onSearch("");
      if (value === debouncedValue) return;

      onSearch(value);
      isSubmitted.current = true;
    }

    if (type === "submit") {
      if (value === prevSubmittedValue.current) return;
      onSearch(value);
      prevSubmittedValue.current = value;
    }

    onSearch(value);
  };

  useWatchEffect(() => {
    if (type !== "live") return;
    if (isSubmitted.current) return;
    if (value.length < MIN_SEARCH_LENGTH) return onSearch("");

    onSearch(debouncedValue);
    isSubmitted.current = true;
  }, [debouncedValue]);

  useWatchEffect(() => {
    if (type !== "live") return;
    if (submitResetTimer.current) clearTimeout(submitResetTimer.current);

    submitResetTimer.current = setTimeout(() => {
      isSubmitted.current = false;
    }, 500);
  }, [isSubmitted.current]);

  return (
    <form {...rest} className={className} onSubmit={submitHandler}>
      <Input
        placeholder={placeholder}
        startContent={<Icon name="HiSearch" color="gray" />}
        value={value}
        onChange={(evt) => setValue(evt.currentTarget.value)}
      />
    </form>
  );
};
