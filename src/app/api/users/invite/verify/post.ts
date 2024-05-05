import { bllService } from "@/services/bll";
import { AcceptInviteRequest } from "@/services/bll/modules/users/schema";
import { NextRequest, NextResponse } from "next/server";

export const postAcceptInvite = async (req: NextRequest) => {
  const data = (await req.json()) as AcceptInviteRequest;

  const response = bllService.users.acceptInvite(data);

  return NextResponse.json(response, { status: 200 });
};
