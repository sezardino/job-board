import { bllService } from "@/services/bll";
import {
  ResendVerificationEmailRequest,
  ResendVerificationEmailResponse,
} from "@/services/bll/modules/auth/schema";
import { NextRequest, NextResponse } from "next/server";

export const postResendVerificationEmail = async (req: NextRequest) => {
  const body = (await req.json()) as ResendVerificationEmailRequest;

  try {
    if ("email" in body) {
      const res = await bllService.auth.resendVerificationEmailByEmail(
        body.email
      );

      return NextResponse.json(
        { status: res } as ResendVerificationEmailResponse,
        { status: 200 }
      );
    }

    const res = await bllService.auth.resendVerificationEmailByToken(
      body.token
    );

    return NextResponse.json(
      { status: res } as ResendVerificationEmailResponse,
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Can't resend verification token", error },
      { status: 500 }
    );
  }
};
