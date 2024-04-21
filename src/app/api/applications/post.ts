import { AdminRoles, CompanyRoles } from "@/const";
import { getNextAuthSession } from "@/libs/next-auth";
import { bllService } from "@/services/bll";
import {
  ApplyForOfferResponse,
  applyForOfferRequestSchema,
} from "@/services/bll/modules/application/schema";
import { BadRequestException } from "@/types";
import { NextRequest, NextResponse } from "next/server";
import { formatFormData } from "../utils";

const notAcceptedRoles = [...AdminRoles, ...CompanyRoles];

export const postApplyForOffer = async (req: NextRequest) => {
  const data = applyForOfferRequestSchema.parse(
    formatFormData(await req.formData())
  );
  const session = await getNextAuthSession();

  const isNotAcceptedRole = notAcceptedRoles.some(
    (role) => role === session?.user.role
  );

  if (isNotAcceptedRole)
    throw new BadRequestException({
      message: "You are not allowed to apply for an offer",
    });

  const application = await bllService.applications.apply(
    data,
    session?.user.companyId!
  );

  return NextResponse.json({ success: application } as ApplyForOfferResponse, {
    status: 201,
  });
};
