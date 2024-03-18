import { bllService } from "@/services/bll";
import { CreateIndustryResponse } from "@/services/bll/modules/industries/schema";
import { NextRequest, NextResponse } from "next/server";

export const postCreateIndustry = async (req: NextRequest) => {
  const body = await req.json();

  const res = await bllService.industries.create(body);

  return NextResponse.json({ industry: res } as CreateIndustryResponse, {
    status: 201,
  });
};
