import { bllService } from "@/services/bll";
import { CompanyBaseDataResponse } from "@/services/bll/modules/companies/schema";
import { NextResponse } from "next/server";

export const getCompanyBaseData = async (
  _: any,
  params: { params: { id: string } }
) => {
  const res = await bllService.companies.baseData(params.params.id);

  return NextResponse.json(res as CompanyBaseDataResponse, { status: 200 });
};
