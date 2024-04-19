import { getNextAuthSession } from "@/libs/next-auth";
import { bllService } from "@/services/bll";
import { ChangePasswordRequest } from "@/services/bll/modules/users/schema";
import { BadRequestException } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export const patchChangePassword = async (req: NextRequest) => {
  const data = (await req.json()) as ChangePasswordRequest;
  const session = await getNextAuthSession();

  const isUserOnline = session?.user;

  if (data.token && isUserOnline) throw new BadRequestException("Bad request");
  if (!data.token && !isUserOnline)
    throw new BadRequestException("Bad request");

  const response = await bllService.users.changePassword({
    ...data,
    userId: isUserOnline ? session.user.id : undefined,
    token: isUserOnline ? undefined : data.token,
  });

  return NextResponse.json(response, { status: 200 });
};
