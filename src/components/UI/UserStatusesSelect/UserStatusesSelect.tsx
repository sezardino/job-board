import { useMemo, type FC } from "react";

import {
  Select,
  SelectOption,
  SelectProps,
} from "@/components/base/Select/Select";
import { UserStatus } from "@prisma/client";
import { useTranslations } from "next-intl";

export type UserStatusesSelectOptions = UserStatus | "all";

type OmittedSelectProps = Omit<
  SelectProps<UserStatusesSelectOptions, false>,
  "options" | "isMultiple"
>;

type Props = {
  withAll?: boolean;
  disabledBlocked?: boolean;
};

export type UserStatusesSelectProps = OmittedSelectProps & Props;

export const UserStatusesSelect: FC<UserStatusesSelectProps> = (props) => {
  const { withAll = false, disabledBlocked = false, ...rest } = props;
  const statusT = useTranslations("entity.users.status");

  const options = useMemo<SelectOption<UserStatusesSelectOptions>[]>(() => {
    const options: SelectOption<UserStatusesSelectOptions>[] = [
      {
        id: UserStatus.BLOCKED,
        label: statusT(UserStatus.BLOCKED),
        disabled: disabledBlocked,
      },
      {
        id: UserStatus.ACTIVE,
        label: statusT(UserStatus.ACTIVE),
      },
      {
        id: UserStatus.INACTIVE,
        label: statusT(UserStatus.INACTIVE),
      },
    ];

    const allOption: SelectOption<UserStatusesSelectOptions> = {
      id: "all",
      label: statusT("all"),
    };

    return [...(withAll ? [allOption] : []), ...options];
  }, [disabledBlocked, statusT, withAll]);

  return <Select {...rest} isMultiple={false} options={options} />;
};
