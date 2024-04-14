import { getNextAuthSession } from "@/libs/next-auth";
import { bllService } from "@/services/bll";
import { CurrentCompanyOffersRequest } from "@/services/bll/modules/offers/schema";
import { BadRequestException, NotAllowedException } from "@/types";
import { OfferStatus, UserRoles } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { formatUrlSearchParams } from "../../utils";

const CompanyUsers = [
  UserRoles.OWNER,
  UserRoles.MODERATOR,
  UserRoles.RECRUITER,
];

const AdminUsers = [UserRoles.ADMIN, UserRoles.SUB_ADMIN];

export const getCurrentCompanyOffers = async (req: NextRequest) => {
  const { companyId, ...data } = formatUrlSearchParams(
    req.nextUrl.searchParams
  ) as CurrentCompanyOffersRequest;
  const session = await getNextAuthSession();

  const isAdmin = AdminUsers.some((r) => r === session?.user.role!);

  if (
    data.status === OfferStatus.INACTIVE &&
    CompanyUsers.some((r) => r === session?.user.role!)
  )
    throw new NotAllowedException(
      "You are not allowed to view inactive offers"
    );

  if (!companyId && isAdmin)
    throw new BadRequestException("Company id is required");

  const res = await bllService.offers.companyOffers({
    ...data,
    companyId: isAdmin ? companyId! : session!.user.companyId!,
    isAdmin,
  });

  return NextResponse.json(res, { status: 200 });
};
