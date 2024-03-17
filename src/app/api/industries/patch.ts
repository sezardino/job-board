import { bllService } from "@/services/bll";
import { UpdateIndustryResponse } from "@/services/bll/modules/industries/schema";
import { NextRequest, NextResponse } from "next/server";

export const patchUpdateIndustry = async (req: NextRequest) => {
  const body = await req.json();

  try {
    const res = await bllService.industries.update(body);

    if (!res) {
      return NextResponse.json(
        { message: "Industry not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(res as UpdateIndustryResponse, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Can't update industry" },
      { status: 500 }
    );
  }
};
