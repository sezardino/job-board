import { getNextAuthSession } from "@/libs/next-auth";
import { bllService } from "@/services/bll";
import { ResetPasswordRequest } from "@/services/bll/modules/auth/schema";
import { BadRequestException } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export const patchResetPassword = async (req: NextRequest) => {
  const data = (await req.json()) as ResetPasswordRequest;
  const session = await getNextAuthSession();

  const isUserOnline = session?.user;

  if (data.token && isUserOnline)
    throw new BadRequestException({ message: "Bad request" });
  if (!data.token && !isUserOnline)
    throw new BadRequestException({ message: "Bad request" });

  const response = await bllService.auth.resetPassword(data);

  return NextResponse.json(response, { status: 200 });
};
