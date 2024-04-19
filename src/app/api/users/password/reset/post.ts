import { bllService } from "@/services/bll";
import { ResetPasswordRequest } from "@/services/bll/modules/users/schema";
import { NextRequest, NextResponse } from "next/server";

export const postResetPassword = async (req: NextRequest) => {
  const data = (await req.json()) as ResetPasswordRequest;

  const response = await bllService.users.resetPassword(data);

  return NextResponse.json(response, { status: 200 });
};
