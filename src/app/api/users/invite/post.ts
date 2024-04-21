import { getNextAuthSession } from "@/libs/next-auth";
import { bllService } from "@/services/bll";
import {
  InviteUsersRequest,
  InviteUsersResponse,
} from "@/services/bll/modules/users/schema";
import { NotAllowedException } from "@/types";
import { UserRoles } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const postInviteUsers = async (req: NextRequest) => {
  const data = (await req.json()) as InviteUsersRequest;
  const session = await getNextAuthSession();

  const hasOwnerRole = data?.users.some(
    (user) => user.role === UserRoles.OWNER
  );
  const hasAdminRole = data?.users.some(
    (user) => user.role === UserRoles.ADMIN
  );

  if (hasOwnerRole && hasAdminRole)
    throw new NotAllowedException({ message: "Method not allowed" });

  if (
    session?.user.role === UserRoles.OWNER &&
    (hasAdminRole ||
      data?.users.some((user) => user.role === UserRoles.SUB_ADMIN))
  ) {
    throw new NotAllowedException({ message: "Method not allowed" });
  }

  if (
    session?.user.role === UserRoles.ADMIN &&
    (hasOwnerRole ||
      data?.users.some(
        (user) =>
          user.role === UserRoles.MODERATOR || user.role === UserRoles.RECRUITER
      ))
  ) {
    throw new NotAllowedException({ message: "Method not allowed" });
  }

  const res = await bllService.users.inviteUsers(
    data!,
    session?.user.companyId!
  );

  return NextResponse.json(res as InviteUsersResponse, { status: 201 });
};
