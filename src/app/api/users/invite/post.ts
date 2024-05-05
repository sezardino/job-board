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

  const isInviteSubAdminUsers = data?.users.every(
    (user) => user.role === UserRoles.SUB_ADMIN
  );
  const isInviteCompanyUsers = data?.users.every(
    (user) =>
      user.role === UserRoles.MODERATOR || user.role === UserRoles.RECRUITER
  );

  if (session?.user.role === UserRoles.OWNER && isInviteSubAdminUsers) {
    throw new NotAllowedException({ message: "Method not allowed" });
  }

  if (session?.user.role === UserRoles.ADMIN && isInviteCompanyUsers) {
    throw new NotAllowedException({ message: "Method not allowed" });
  }

  const res = await bllService.users.invite({
    users: data.users,
    inviterId: session?.user.id!,
  });

  return NextResponse.json(res as InviteUsersResponse, { status: 201 });
};
