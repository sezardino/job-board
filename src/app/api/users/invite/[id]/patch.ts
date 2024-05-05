import { getNextAuthSession } from "@/libs/next-auth";
import { bllService } from "@/services/bll";
import { ResendInviteResponse } from "@/services/bll/modules/users/schema";
import { NextRequest, NextResponse } from "next/server";

export const patchResendInvite = async (
  req: NextRequest,
  params: { params: { id: string } }
) => {
  const session = await getNextAuthSession();

  const response = await bllService.users.resendInvite({
    inviteId: params.params.id,
    userId: session?.user.id!,
  });

  return NextResponse.json(response as ResendInviteResponse, {
    status: 200,
  });
};
