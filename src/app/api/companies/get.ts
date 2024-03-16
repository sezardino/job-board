import { getNextAuthSession } from "@/libs/next-auth";
import { bllService } from "@/services/bll";
import { NextResponse } from "next/server";

export const getMyCompanyProfile = async () => {
  const session = await getNextAuthSession();

  try {
    const res = await bllService.companies.profile(session?.user.companyId!);

    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Can't get company profile", error },
      { status: 500 }
    );
  }
};
