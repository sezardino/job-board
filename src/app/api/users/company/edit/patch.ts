import { EditCompanyUserResponse } from "@/services/bll/modules/users/schema";
import { NextRequest, NextResponse } from "next/server";

export const patchEditCompanyUser = async (req: NextRequest) => {
  const data = await req.json();

  return NextResponse.json({ success: true } as EditCompanyUserResponse, {
    status: 200,
  });
};
