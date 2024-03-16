import { bllService } from "@/services/bll";
import { CreateIndustryResponse } from "@/services/server/modules/industries/schema";
import { NextRequest, NextResponse } from "next/server";

export const postCreateIndustry = async (req: NextRequest) => {
  const body = await req.json();

  try {
    const res = await bllService.industries.create(body);

    return NextResponse.json({ industry: res } as CreateIndustryResponse, {
      status: 201,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Can't create industry" },
      { status: 500 }
    );
  }
};
