import { ResendInviteResponse } from "@/services/bll/modules/users/schema";
import { NextRequest, NextResponse } from "next/server";

export const patchResendInvite = async (req: NextRequest) => {
  const data = await req.json();

  // TODO: implement resend invite

  return NextResponse.json({ success: true } as ResendInviteResponse, {
    status: 200,
  });
};
