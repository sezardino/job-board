import { getNextAuthSession } from "@/libs/next-auth";
import { bllService } from "@/services/bll";
import { CreateOfferResponse } from "@/services/bll/modules/offers/schema";
import { NextRequest, NextResponse } from "next/server";

export const postCreateOffer = async (req: NextRequest) => {
  const body = await req.json();
  const session = await getNextAuthSession();

  const newOffer = await bllService.offers.create(
    body,
    session?.user.companyId!
  );

  return NextResponse.json({ status: !!newOffer.id } as CreateOfferResponse, {
    status: 201,
  });
};
