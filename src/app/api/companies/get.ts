import { getNextAuthSession } from "@/libs/next-auth";
import { bllService } from "@/services/bll";
import { NextResponse } from "next/server";

export const getMyCompanyProfile = async () => {
  const session = await getNextAuthSession();

  const res = await bllService.companies.profile(session?.user.companyId!);

  return NextResponse.json(res, { status: 200 });
};
