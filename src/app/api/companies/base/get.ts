import { bllService } from "@/services/bll";
import { MyCompanyBaseDataResponse } from "@/services/server/modules/companies/schema";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const getMyCompanyBaseData = async () => {
  const session = await getServerSession();

  try {
    const res = await bllService.companies.baseData(session?.user.companyId!);

    return NextResponse.json(res as MyCompanyBaseDataResponse, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Can't get company data", error },
      { status: 500 }
    );
  }
};
