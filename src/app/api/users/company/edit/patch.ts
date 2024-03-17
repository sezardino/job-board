import { EditCompanyUserResponse } from "@/services/server/modules/users/schema";
import { NextRequest, NextResponse } from "next/server";

export const patchEditCompanyUser = async (req: NextRequest) => {
  const data = await req.json();

  try {
    return NextResponse.json({ success: true } as EditCompanyUserResponse, {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({ success: true } as EditCompanyUserResponse, {
      status: 200,
    });
  }
};
