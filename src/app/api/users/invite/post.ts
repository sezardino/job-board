import { bllService } from "@/services/bll";
import {
  InviteUsersRequest,
  InviteUsersResponse,
} from "@/services/bll/modules/users/schema";
import { UserRoles } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const postInviteUsers = async (req: NextRequest) => {
  const data = (await req.json()) as InviteUsersRequest;
  const session = await getServerSession();

  const hasOwnerRole = data?.users.some(
    (user) => user.role === UserRoles.OWNER
  );
  const hasAdminRole = data?.users.some(
    (user) => user.role === UserRoles.ADMIN
  );

  if (hasOwnerRole && hasAdminRole)
    return NextResponse.json(
      { message: "Method not allowed" },
      { status: 405 }
    );

  if (
    session?.user.role === UserRoles.OWNER &&
    (hasAdminRole ||
      data?.users.some((user) => user.role === UserRoles.SUB_ADMIN))
  ) {
    return NextResponse.json(
      { message: "Method not allowed" },
      { status: 405 }
    );
  }

  if (
    session?.user.role === UserRoles.ADMIN &&
    (hasOwnerRole ||
      data?.users.some(
        (user) =>
          user.role === UserRoles.MODERATOR || user.role === UserRoles.RECRUITER
      ))
  ) {
    return NextResponse.json(
      { message: "Method not allowed" },
      { status: 405 }
    );
  }

  try {
    const res = await bllService.users.inviteUsers(
      data!,
      session?.user.companyId!
    );

    return NextResponse.json(res as InviteUsersResponse, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "backend-errors.server" },
      { status: 500 }
    );
  }
};
