import { AcceptInviteRequest } from "@/services/bll/modules/users/schema";
import { NextRequest, NextResponse } from "next/server";

export const postAcceptInvite = async (req: NextRequest) => {
  const data = (await req.json()) as AcceptInviteRequest;

  return NextResponse.json({}, { status: 200 });
};
