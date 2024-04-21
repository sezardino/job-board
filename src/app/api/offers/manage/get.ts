import { getNextAuthSession } from "@/libs/next-auth";
import { bllService } from "@/services/bll";
import { OffersForManageRequest } from "@/services/bll/modules/offers/schema";
import { NotAllowedException } from "@/types";
import { OfferStatus, UserRoles } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { formatUrlSearchParams } from "../../utils";

const CompanyUsers = [
  UserRoles.OWNER,
  UserRoles.MODERATOR,
  UserRoles.RECRUITER,
];

const AdminUsers = [UserRoles.ADMIN, UserRoles.SUB_ADMIN];

export const getOffersForManage = async (req: NextRequest) => {
  const { companyId, ...data } = formatUrlSearchParams<OffersForManageRequest>(
    req.nextUrl.searchParams
  );
  const session = await getNextAuthSession();

  const isAdmin = AdminUsers.some((r) => r === session?.user.role!);

  if (
    data.status === OfferStatus.INACTIVE &&
    CompanyUsers.some((r) => r === session?.user.role!)
  )
    throw new NotAllowedException({
      message: "You are not allowed to view inactive offers",
    });

  const res = await bllService.offers.offersForManage({
    ...data,
    companyId: isAdmin ? companyId! : session!.user.companyId!,
    isAdmin,
  });

  return NextResponse.json(res, { status: 200 });
};
