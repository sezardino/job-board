import { ComponentPropsWithoutRef } from "react";

export interface AutocompleteOption {
  id: string;
  label: string;
}

export type AutocompleteRenderOptionArgs<T extends AutocompleteOption> = {
  item: T;
  isSelected: boolean;
  isActive: boolean;
};

export type AutocompleteRenderSelectedOptionArgs<T extends AutocompleteOption> =
  {
    item: T;
    onClick: (id: string) => void;
  };

export type AutocompleteRenderSelectedOptionsArgs<
  T extends AutocompleteOption,
> = {
  items: T[];
  onClick: (id: string) => void;
};

type Props<T extends AutocompleteOption> = ComponentPropsWithoutRef<"div"> & {
  label?: string;
  placeholder?: string;
  description?: string;
  error?: string;
  disabled?: boolean;
  showSelected?: "in" | "out";
  //
  items: T[];
  noResultsMessage: string;
  renderOption?: (args: AutocompleteRenderOptionArgs<T>) => JSX.Element;
  renderSelectedOption?: (
    args: AutocompleteRenderSelectedOptionArgs<T>
  ) => JSX.Element;
  renderSelectedOptions?: (
    args: AutocompleteRenderSelectedOptionsArgs<T>
  ) => JSX.Element;
  //
  footer?: JSX.Element;
  header?: JSX.Element;
};

export type AutocompleteMultipleProps<T extends AutocompleteOption> =
  Props<T> & {
    onSelectedChange: (value: string[]) => void;
    selected: string[];
    multiple: true;
  };

export type AutocompleteNotMultipleProps<T extends AutocompleteOption> =
  Props<T> & {
    selected?: string;
    onSelectedChange: (value?: string) => void;
    multiple: false;
  };
