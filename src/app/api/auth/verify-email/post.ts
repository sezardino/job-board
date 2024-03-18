import { bllService } from "@/services/bll";
import { VerifyEmailTokenResponse } from "@/services/bll/modules/auth/schema";
import { NextRequest, NextResponse } from "next/server";

export const postVerifyEmail = async (req: NextRequest) => {
  const body = await req.json();

  const res = await bllService.auth.verifyEmailToken(body.token);

  return NextResponse.json({ status: res } as VerifyEmailTokenResponse, {
    status: 200,
  });
};
