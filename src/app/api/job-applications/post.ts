import { getNextAuthSession } from "@/libs/next-auth";
import { bllService } from "@/services/bll";
import {
  ApplyForJobOfferResponse,
  applyForJobOfferRequestSchema,
} from "@/services/bll/modules/job-application/schema";
import { NextRequest, NextResponse } from "next/server";
import { formatFormData } from "../utils";

export const postApplyForJobOffer = async (req: NextRequest) => {
  const data = applyForJobOfferRequestSchema.parse(
    formatFormData(await req.formData())
  );

  const session = await getNextAuthSession();

  const application = await bllService.jobApplications.apply(
    data,
    session?.user.companyId!
  );

  return NextResponse.json(
    { success: application } as ApplyForJobOfferResponse,
    { status: 201 }
  );
};
