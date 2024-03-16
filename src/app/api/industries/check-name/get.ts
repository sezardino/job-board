import { bllService } from "@/services/bll";
import { CheckIndustryNameAvailableResponse } from "@/services/server/modules/industries/schema";
import { NextRequest, NextResponse } from "next/server";
import { formatUrlSearchParams } from "../../utils";

export const getIndustryNameAvailable = async (req: NextRequest) => {
  const params = formatUrlSearchParams(req.nextUrl.searchParams);

  try {
    const bllResponse = await bllService.industries.checkNameAvailable(
      params.name!
    );

    return NextResponse.json(
      { available: bllResponse } as CheckIndustryNameAvailableResponse,
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "backend-errors.server" },
      { status: 500 }
    );
  }
};
