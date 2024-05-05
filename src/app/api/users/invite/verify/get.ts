import { formatUrlSearchParams } from "@/app/api/utils";
import { bllService } from "@/services/bll";
import {
  CheckInviteTokenRequest,
  CheckInviteTokenResponse,
  CheckInviteTokenStatus,
} from "@/services/bll/modules/users/schema";
import { NextRequest, NextResponse } from "next/server";

export const getCheckInviteToken = async (req: NextRequest) => {
  const params = formatUrlSearchParams<CheckInviteTokenRequest>(
    req.nextUrl.searchParams
  );

  const response = await bllService.users.checkInviteToken(params.token);

  return NextResponse.json(
    {
      success: response === CheckInviteTokenStatus.Success,
    } as CheckInviteTokenResponse,
    {
      status: 200,
    }
  );
};
