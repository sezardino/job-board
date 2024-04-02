import { getNextAuthSession } from "@/libs/next-auth";
import { bllService } from "@/services/bll";
import {
  ApplyForJobOfferRequest,
  ApplyForJobOfferResponse,
} from "@/services/bll/modules/job-application/schema";
import { NextRequest, NextResponse } from "next/server";
import { formatFormData } from "../utils";

export const postApplyForJobOffer = async (req: NextRequest) => {
  const data = formatFormData(await req.formData()) as ApplyForJobOfferRequest;
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
