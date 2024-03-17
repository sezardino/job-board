import { bllService } from "@/services/bll";
import {
  CheckEmailAvailableRequest,
  CheckEmailAvailableResponse,
} from "@/services/bll/modules/users/schema";
import { NextRequest, NextResponse } from "next/server";
import { formatUrlSearchParams } from "../../utils";

export const getEmailAvailable = async (req: NextRequest) => {
  const params = formatUrlSearchParams(
    req.nextUrl.searchParams
  ) as CheckEmailAvailableRequest;

  try {
    const bllResponse = await bllService.users.checkEmailAvailable(params);

    return NextResponse.json(
      { available: !bllResponse } as CheckEmailAvailableResponse,
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "backend-errors.server" },
      { status: 500 }
    );
  }
};
