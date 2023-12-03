"use client";

import { Combobox, Transition } from "@headlessui/react";

import { Fragment, useMemo, useRef, useState } from "react";

import { twMerge } from "tailwind-merge";
import { Badge, Button } from "..";
import { Icon } from "../Icon/Icon";
import { Typography } from "../Typography/Typography";
import {
  AutocompleteMultipleProps,
  AutocompleteNotMultipleProps,
  AutocompleteOption,
} from "./Autocomplete.types";

export type AutocompleteProps<
  T extends AutocompleteOption,
  TMultiple = boolean
> = TMultiple extends true
  ? AutocompleteMultipleProps<T>
  : AutocompleteNotMultipleProps<T>;

export const Autocomplete = <T extends AutocompleteOption>(
  props: AutocompleteProps<T>
) => {
  const {
    label,
    placeholder,
    disabled = false,
    error,
    description,
    //
    items,
    noResultsMessage,
    selected,
    multiple,
    renderOption,
    renderSelectedOption,
    renderSelectedOptions,
    onSelectedChange,
    footer,
    header,
    className,
    showSelected = "in",
    ...rest
  } = props;
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const changeHandler = (value?: string | string[]) => {
    if (disabled) return;

    if (multiple && Array.isArray(value)) {
      onSelectedChange(value);

      return;
    }

    if (!multiple && !Array.isArray(value)) {
      onSelectedChange(value);

      return;
    }
  };

  const onListItemClick = (id: string) => {
    if (disabled) return;

    if (!multiple) {
      changeHandler(undefined);
      return;
    }
    if (!Array.isArray(selected)) return;

    if (multiple && Array.isArray(selected)) {
      changeHandler(selected.filter((i) => i !== id));
    }
  };

  const filteredItems = useMemo(
    () =>
      items.filter((item) =>
        item.label.toLowerCase().includes(query.toLowerCase())
      ),
    [items, query]
  );

  const selectedItems = useMemo(() => {
    if (!selected) return [];

    if (multiple) {
      return items.filter((item) => selected.includes(item.id));
    }

    const item = items.find((item) => item.id === selected);

    return item ? [item] : [];
  }, [selected]);

  const isNoItemsShowed =
    items.length === 0 || (filteredItems.length === 0 && query !== "");

  const hasPlaceholder = multiple
    ? Array.isArray(selected) && selected.length === 0
      ? placeholder
      : ""
    : placeholder;

  const itemsJSX = renderSelectedOptions?.({
    items: selectedItems,
    onClick: onListItemClick,
  }) ?? (
    <ul
      className={twMerge(
        "flex flex-wrap gap-1",
        showSelected === "in" && "py-2 px-3"
      )}
    >
      {selectedItems.map((item) => (
        <li key={item.id}>
          <button onClick={() => onListItemClick(item.id)}>
            {renderSelectedOption?.({
              item: item,
              onClick: onListItemClick,
            }) ?? (
              <Badge onClose={() => onListItemClick(item.id)}>
                {item.label}
              </Badge>
            )}
          </button>
        </li>
      ))}
    </ul>
  );

  return (
    <Combobox
      {...rest}
      as="div"
      disabled={disabled}
      // @ts-ignore
      multiple={multiple}
      value={selected}
      className={twMerge(className)}
      onChange={changeHandler}
    >
      <div className="relative">
        {label && (
          <Combobox.Label as={Typography} tag="span">
            {label}
          </Combobox.Label>
        )}
        <div
          className={twMerge(
            "border",
            "relative w-full inline-flex tap-highlight-transparent shadow-sm bg-default-100 min-h-unit-10 rounded-medium justify-center gap-0 transition-background motion-reduce:transition-none !duration-150 outline-none",
            !!error && "border-danger"
          )}
          onClick={() => inputRef.current?.focus()}
        >
          {showSelected === "in" && selected?.length ? itemsJSX : null}

          {(showSelected === "out" ||
            (showSelected === "in" && !selectedItems.length)) && (
            <Combobox.Input
              ref={inputRef}
              value={query}
              className="bg-inherit w-full border-none py-2 px-3 text-sm leading-5 text-gray-900 focus:ring-0 rounded-medium"
              onChange={(event) => setQuery(event.target.value)}
              placeholder={hasPlaceholder ? placeholder : ""}
            />
          )}

          <Combobox.Button
            as={Button}
            isIconOnly
            variant="light"
            className="ml-auto"
          >
            {({ open }) => (
              <Icon name={open ? "HiX" : "HiChevronDown"} size={20} />
            )}
          </Combobox.Button>
        </div>

        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setQuery("")}
        >
          <div className="absolute z-50  top-[calc(100%+2px)] left-0 right-0 border rounded-sm bg-default-100">
            {header && <div className="border-b">{header}</div>}
            <Combobox.Options className="max-h-80 overflow-auto" as="div">
              {isNoItemsShowed && (
                <Typography tag="span" className="block p-3 select-none">
                  {noResultsMessage}
                </Typography>
              )}

              <ul>
                {filteredItems.map((i) => (
                  <Combobox.Option key={i.id} as={"li"} value={i.id}>
                    {({ selected, active }) => (
                      <li
                        className={twMerge(
                          "cursor-pointer select-none py-2 px-3",
                          selected && "bg-primary-100",
                          active && "bg-primary-200"
                        )}
                      >
                        {renderOption?.({
                          item: i,
                          isSelected: selected,
                          isActive: active,
                        }) ?? (
                          <Typography tag="span" className="block">
                            {i.label}
                          </Typography>
                        )}
                      </li>
                    )}
                  </Combobox.Option>
                ))}
              </ul>
            </Combobox.Options>

            {footer && <div className="border-t">{footer}</div>}
          </div>
        </Transition>
      </div>
      <div className="mt-1 grid grid-cols-1 gap-1">
        {showSelected === "out" ? itemsJSX : null}
        {description && <Typography tag="p">{description}</Typography>}
        {error && (
          <Typography tag="p" color="danger">
            {error}
          </Typography>
        )}
      </div>
    </Combobox>
  );
};
