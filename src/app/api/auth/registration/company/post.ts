import { bllService } from "@/services/bll";
import { CompanyRegistrationResponse } from "@/services/bll/modules/auth/schema/company-registration";
import { NextRequest, NextResponse } from "next/server";

export const postCompanyRegistration = async (req: NextRequest) => {
  const body = await req.json();

  const status = await bllService.auth.companyRegistration(body);

  return NextResponse.json({ status } as CompanyRegistrationResponse, {
    status: 201,
  });
};
