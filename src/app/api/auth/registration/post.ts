import { bllService } from "@/services/bll";
import { CustomerRegistrationResponse } from "@/services/bll/modules/auth/schema";
import { NextRequest, NextResponse } from "next/server";

export const postCustomerRegistration = async (req: NextRequest) => {
  const body = await req.json();

  const status = await bllService.auth.customerRegistration(body);

  return NextResponse.json({ status } as CustomerRegistrationResponse, {
    status: 201,
  });
};
