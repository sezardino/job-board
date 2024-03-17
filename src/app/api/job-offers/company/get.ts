import { bllService } from "@/services/bll";
import { CurrentCompanyJobOffersRequest } from "@/services/bll/modules/job-offers/schema";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { formatUrlSearchParams } from "../../utils";

export const getCurrentCompanyJobOffers = async (req: NextRequest) => {
  const data = formatUrlSearchParams(
    req.nextUrl.searchParams
  ) as CurrentCompanyJobOffersRequest;
  const session = await getServerSession();

  try {
    const res = await bllService.jobOffers.companyOffers(
      data!,
      session!.user.companyId!
    );

    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Can't get offers", error },
      { status: 500 }
    );
  }
};
