import { formatUrlSearchParams } from "@/app/api/utils";
import { bllService } from "@/services/bll";
import { VerifyResetPasswordTokenRequest } from "@/services/bll/modules/users/schema/verify-reset-password-token";
import { NextRequest, NextResponse } from "next/server";

export const getVerifyResetPasswordToken = async (req: NextRequest) => {
  const params = formatUrlSearchParams<VerifyResetPasswordTokenRequest>(
    req.nextUrl.searchParams
  );

  const response = await bllService.users.verifyResetPasswordToken(params);

  return NextResponse.json(response, { status: 200 });
};
