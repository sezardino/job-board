import { bllService } from "@/services/bll";
import { ResetPasswordRequest } from "@/services/bll/modules/auth/schema";
import { NextRequest, NextResponse } from "next/server";

export const patchResetPassword = async (req: NextRequest) => {
  const data = (await req.json()) as ResetPasswordRequest;

  const response = await bllService.auth.resetPassword(data);

  return NextResponse.json(response, { status: 200 });
};
