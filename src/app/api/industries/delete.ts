import { bllService } from "@/services/bll";
import { DeleteIndustryResponse } from "@/services/bll/modules/industries/schema";
import { NextRequest, NextResponse } from "next/server";

export const deleteIndustry = async (req: NextRequest) => {
  const body = await req.json();

  try {
    const res = await bllService.industries.delete(body.id);

    if (!res)
      return NextResponse.json(
        { message: "Industry not found" },
        { status: 404 }
      );

    return NextResponse.json({ industry: res } as DeleteIndustryResponse, {
      status: 404,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "backend-errors.server" },
      { status: 500 }
    );
  }
};
