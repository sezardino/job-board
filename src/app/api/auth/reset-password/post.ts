import { bllService } from "@/services/bll";
import { ResetPasswordRequestDto } from "@/services/bll/modules/auth/schema";
import { NextRequest, NextResponse } from "next/server";

export const postResetPassword = async (req: NextRequest) => {
  const data = (await req.json()) as ResetPasswordRequestDto;

  const response = await bllService.auth.resetPasswordRequest(data);

  return NextResponse.json(response, { status: 200 });
};
