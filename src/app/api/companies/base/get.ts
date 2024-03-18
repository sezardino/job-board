import { bllService } from "@/services/bll";
import { MyCompanyBaseDataResponse } from "@/services/bll/modules/companies/schema";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const getMyCompanyBaseData = async () => {
  const session = await getServerSession();

  const res = await bllService.companies.baseData(session?.user.companyId!);

  return NextResponse.json(res as MyCompanyBaseDataResponse, { status: 200 });
};
