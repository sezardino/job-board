import { UserStatusesSelect } from "@/components/UI/UserStatusesSelect/UserStatusesSelect";
import { SearchForm } from "@/components/base/SearchForm/SearchForm";
import { type ComponentPropsWithoutRef, type FC } from "react";

export type ManageCompanyUsersProps = ComponentPropsWithoutRef<"section"> & {};

export const ManageCompanyUsers: FC<ManageCompanyUsersProps> = (props) => {
  const { className, ...rest } = props;

  return (
    <div {...rest} className={className}>
      <header className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <SearchForm onSearch={() => undefined} />
          <UserStatusesSelect onChange={() => undefined} />
        </div>
      </header>
    </div>
  );
};
