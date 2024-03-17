import { bllService } from "@/services/bll";
import { VerifyEmailTokenResponse } from "@/services/bll/modules/auth/schema";
import { NextRequest, NextResponse } from "next/server";

export const postVerifyEmail = async (req: NextRequest) => {
  const body = await req.json();

  try {
    const res = await bllService.auth.verifyEmailToken(body.token);

    return NextResponse.json({ status: res } as VerifyEmailTokenResponse, {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({ message: "Can't verify email", error } as {}, {
      status: 500,
    });
  }
};
