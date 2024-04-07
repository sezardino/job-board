import { getNextAuthSession } from "@/libs/next-auth";
import { bllService } from "@/services/bll";
import { ResendInviteResponse } from "@/services/bll/modules/users/schema";
import { NextRequest, NextResponse } from "next/server";

export const patchEditOffer = async (
  req: NextRequest,
  params: { params: { id: string } }
) => {
  const data = await req.json();
  const session = await getNextAuthSession();

  const response = await bllService.offers.edit(
    data,
    params.params.id,
    session?.user.companyId!
  );

  return NextResponse.json({ success: !!response.id } as ResendInviteResponse, {
    status: 200,
  });
};
