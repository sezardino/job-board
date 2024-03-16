import { bllService } from "@/services/bll";
import { ActiveIndustriesResponse } from "@/services/server/modules/industries/schema";
import { NextResponse } from "next/server";

export const getActiveIndustries = async () => {
  try {
    const res = await bllService.industries.activeIndustries();

    return NextResponse.json({ data: res } as ActiveIndustriesResponse, {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Can't get active industries" },
      { status: 500 }
    );
  }
};
