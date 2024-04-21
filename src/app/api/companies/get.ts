import { getNextAuthSession } from "@/libs/next-auth";
import { bllService } from "@/services/bll";
import { CompanyProfileRequest } from "@/services/bll/modules/companies/schema";
import { BadRequestException } from "@/types";
import { NextRequest, NextResponse } from "next/server";
import { formatUrlSearchParams } from "../utils";

export const getCompanyProfile = async (req: NextRequest) => {
  const params = formatUrlSearchParams<CompanyProfileRequest>(
    req.nextUrl.searchParams
  );
  const session = await getNextAuthSession();

  if (!session?.user.companyId)
    throw new BadRequestException({ message: "Company id not provided" });

  const res = await bllService.companies.profile({
    id: params.id ? params.id : session?.user.companyId!,
  });

  return NextResponse.json(res, { status: 200 });
};
