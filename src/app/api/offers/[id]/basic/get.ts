import { getNextAuthSession } from "@/libs/next-auth";
import { bllService } from "@/services/bll";
import { NextResponse } from "next/server";

export const getBasicOfferData = async (
  _: any,
  params: { params: { id: string } }
) => {
  const session = await getNextAuthSession();

  const res = await bllService.offers.basicData(
    params.params.id,
    session?.user?.companyId!
  );

  return NextResponse.json(res, { status: 200 });
};
