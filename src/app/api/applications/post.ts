import { getNextAuthSession } from "@/libs/next-auth";
import { bllService } from "@/services/bll";
import {
  ApplyForOfferResponse,
  applyForOfferRequestSchema,
} from "@/services/bll/modules/application/schema";
import { NextRequest, NextResponse } from "next/server";
import { formatFormData } from "../utils";

export const postApplyForOffer = async (req: NextRequest) => {
  const data = applyForOfferRequestSchema.parse(
    formatFormData(await req.formData())
  );

  const session = await getNextAuthSession();

  const application = await bllService.applications.apply(
    data,
    session?.user.companyId!
  );

  return NextResponse.json({ success: application } as ApplyForOfferResponse, {
    status: 201,
  });
};
