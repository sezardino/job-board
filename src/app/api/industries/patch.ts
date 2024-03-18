import { bllService } from "@/services/bll";
import { UpdateIndustryResponse } from "@/services/bll/modules/industries/schema";
import { NextRequest, NextResponse } from "next/server";

export const patchUpdateIndustry = async (req: NextRequest) => {
  const body = await req.json();

  const res = await bllService.industries.update(body);

  if (!res) {
    return NextResponse.json(
      { message: "Industry not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(res as UpdateIndustryResponse, { status: 200 });
};
