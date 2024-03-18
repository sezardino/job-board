import { bllService } from "@/services/bll";
import { ActiveIndustriesResponse } from "@/services/bll/modules/industries/schema";
import { NextResponse } from "next/server";

export const getActiveIndustries = async () => {
  const res = await bllService.industries.activeIndustries();

  return NextResponse.json({ data: res } as ActiveIndustriesResponse, {
    status: 200,
  });
};
