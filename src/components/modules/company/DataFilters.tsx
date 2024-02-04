import { SearchForm } from "@/components/base/SearchForm/SearchForm";
import { Select, SelectProps } from "@/components/base/Select/Select";
import { type ComponentPropsWithoutRef, type FC } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  search?: {
    placeholder: string;
    onSearchChange: (value: string) => void;
  };
  filters?: Omit<SelectProps<string, false>, "isMultiple">[];
};

export type DataFiltersProps = ComponentPropsWithoutRef<"div"> & Props;

export const DataFilters: FC<DataFiltersProps> = (props) => {
  const { search, filters, className, ...rest } = props;

  return (
    <div
      {...rest}
      className={twMerge(
        "flex-grow flex flex-wrap gap-3 items-center",
        className
      )}
    >
      {search && (
        <SearchForm
          placeholder={search.placeholder}
          onSearch={search.onSearchChange}
        />
      )}
      {filters?.map((f, index) => (
        <Select
          key={index}
          {...f}
          isMultiple={false}
          className="max-w-[220px]"
        />
      ))}
    </div>
  );
};
