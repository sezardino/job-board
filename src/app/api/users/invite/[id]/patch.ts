import { getNextAuthSession } from "@/libs/next-auth";
import { ResendInviteResponse } from "@/services/bll/modules/users/schema";
import { NextRequest, NextResponse } from "next/server";

export const patchResendInvite = async (
  req: NextRequest,
  params: { params: { id: string } }
) => {
  const session = await getNextAuthSession();

  // TODO: implement resend invite

  const response = { success: true } as ResendInviteResponse;

  return NextResponse.json(response as ResendInviteResponse, {
    status: 200,
  });
};
