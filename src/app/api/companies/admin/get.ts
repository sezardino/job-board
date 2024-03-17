import { bllService } from "@/services/bll";
import { AdminCompaniesResponse } from "@/services/bll/modules/companies/schema";
import { NextRequest, NextResponse } from "next/server";
import { formatUrlSearchParams } from "../../utils";

export const getAllCompanies = async (req: NextRequest) => {
  const params = formatUrlSearchParams(req.nextUrl.searchParams);

  try {
    const res = await bllService.companies.admin(params);

    return NextResponse.json(res as AdminCompaniesResponse, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Can't get companies data" },
      { status: 500 }
    );
  }
};
