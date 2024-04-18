import { bllService } from "@/services/bll";
import { NextResponse } from "next/server";

export const getBaseIndustryData = async (
  _: any,
  params: { params: { id: string } }
) => {
  const res = await bllService.industries.baseData(params.params.id);

  return NextResponse.json(res, { status: 200 });
};
