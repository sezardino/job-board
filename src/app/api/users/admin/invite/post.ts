import { bllService } from "@/services/bll";
import {
  InviteAdminRequest,
  InviteAdminResponse,
} from "@/services/bll/modules/users/schema";
import { UserRoles } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const postInviteAdmin = async (req: NextRequest) => {
  const data = (await req.json()) as InviteAdminRequest;

  const res = await bllService.users.inviteUser({
    ...data,
    role: UserRoles.SUB_ADMIN,
  });

  return NextResponse.json({ admin: res } as InviteAdminResponse, {
    status: 201,
  });
};
