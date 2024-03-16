import { bllService } from "@/services/bll";
import { CustomerRegistrationResponse } from "@/services/server/modules/auth/schema";
import { NextRequest, NextResponse } from "next/server";

export const postCustomerRegistration = async (req: NextRequest) => {
  const body = await req.json();

  try {
    const status = await bllService.auth.customerRegistration(body);

    return NextResponse.json({ status } as CustomerRegistrationResponse, {
      status: 201,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Can't register customer", error },
      { status: 500 }
    );
  }
};
