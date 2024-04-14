import { formatUrlSearchParams } from "@/app/api/utils";
import { AdminRoles } from "@/const";
import { getNextAuthSession } from "@/libs/next-auth";
import { bllService } from "@/services/bll";
import { OfferBasicDataRequest } from "@/services/bll/modules/offers/schema";
import { BadRequestException } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export const getBasicOfferData = async (
  req: NextRequest,
  params: { params: { id: string } }
) => {
  const body = formatUrlSearchParams<OfferBasicDataRequest>(
    req.nextUrl.searchParams
  );
  const session = await getNextAuthSession();
  const isAdmin = AdminRoles.some((role) => session?.user?.role === role);

  if (isAdmin && !body.companyId)
    throw new BadRequestException("Company id is required");

  const res = await bllService.offers.basicData({
    offerId: params.params.id,
    companyId: isAdmin ? body.companyId! : session?.user?.companyId!,
  });

  return NextResponse.json(res, { status: 200 });
};
