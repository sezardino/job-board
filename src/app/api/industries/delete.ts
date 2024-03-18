import { bllService } from "@/services/bll";
import { DeleteIndustryResponse } from "@/services/bll/modules/industries/schema";
import { NextRequest, NextResponse } from "next/server";

export const deleteIndustry = async (req: NextRequest) => {
  const body = await req.json();

  const res = await bllService.industries.delete(body.id);

  return NextResponse.json({ industry: res } as DeleteIndustryResponse, {
    status: 200,
  });
};
