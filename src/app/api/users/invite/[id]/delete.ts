import { getNextAuthSession } from "@/libs/next-auth";
import { bllService } from "@/services/bll";
import { CancelInviteResponse } from "@/services/bll/modules/users/schema";
import { NextRequest, NextResponse } from "next/server";

export const deleteCancelInvite = async (
  req: NextRequest,
  params: { params: { id: string } }
) => {
  const session = await getNextAuthSession();

  const response = await bllService.users.cancelInvite({
    inviteId: params.params.id,
    userId: session?.user.id!,
  });

  return NextResponse.json(response as CancelInviteResponse, {
    status: 200,
  });
};
