import { getNextAuthSession } from "@/libs/next-auth";
import { bllService } from "@/services/bll";
import { NextRequest, NextResponse } from "next/server";

export const deleteOffer = async (
  req: NextRequest,
  params: { params: { id: string } }
) => {
  const session = await getNextAuthSession();

  const response = await bllService.offers.delete(
    params.params.id,
    session?.user.companyId!
  );

  return NextResponse.json({ success: !!response.id }, { status: 200 });
};
