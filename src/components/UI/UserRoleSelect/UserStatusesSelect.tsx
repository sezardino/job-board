import { useMemo, type FC } from "react";

import {
  Select,
  SelectOption,
  SelectProps,
} from "@/components/base/Select/Select";
import { UserRoles } from "@prisma/client";
import { useTranslations } from "next-intl";

type OmittedSelectProps = Omit<
  SelectProps<UserRoles, false>,
  "options" | "isMultiple"
>;

type Props = {
  acceptedRoles: UserRoles[];
};

export type UserRoleSelectProps = OmittedSelectProps & Props;

export const UserRoleSelect: FC<UserRoleSelectProps> = (props) => {
  const { acceptedRoles, ...rest } = props;
  const t = useTranslations("entity.users.role");

  const options = useMemo<SelectOption<UserRoles>[]>(
    () => acceptedRoles.map((role) => ({ id: role, label: t(role) })),
    [acceptedRoles, t]
  );

  return <Select {...rest} isMultiple={false} options={options} />;
};
