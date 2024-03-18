import { CancelInviteResponse } from "@/services/bll/modules/users/schema";
import { NextRequest, NextResponse } from "next/server";

export const deleteCancelInvite = async (req: NextRequest) => {
  const data = await req.json();

  // TODO: implement cancel invite

  return NextResponse.json({ success: true } as CancelInviteResponse, {
    status: 200,
  });
};
