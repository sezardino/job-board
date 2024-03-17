import { ResendInviteResponse } from "@/services/bll/modules/users/schema";
import { NextRequest, NextResponse } from "next/server";

export const patchResendInvite = async (req: NextRequest) => {
  const data = await req.json();

  try {
    // TODO: implement resend invite

    return NextResponse.json({ success: true } as ResendInviteResponse, {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Can;t resend invite", success: true } as ResendInviteResponse,
      { status: 500 }
    );
  }
};
