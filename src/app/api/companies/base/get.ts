import { getNextAuthSession } from "@/libs/next-auth";
import { bllService } from "@/services/bll";
import { CompanyBaseDataResponse } from "@/services/bll/modules/companies/schema";
import { NextResponse } from "next/server";

export const getCompanyBaseData = async () => {
  const session = await getNextAuthSession();

  const res = await bllService.companies.baseData(session?.user.companyId!);

  return NextResponse.json(res as CompanyBaseDataResponse, { status: 200 });
};
