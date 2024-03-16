import { bllService } from "@/services/bll";
import { CompanyRegistrationResponse } from "@/services/server/modules/auth/schema/company-registration";
import { NextRequest, NextResponse } from "next/server";

export const postCompanyRegistration = async (req: NextRequest) => {
  const body = await req.json();

  try {
    const status = await bllService.auth.companyRegistration(body);

    return NextResponse.json({ status } as CompanyRegistrationResponse, {
      status: 201,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Cunt register company", error },
      { status: 500 }
    );
  }
};
