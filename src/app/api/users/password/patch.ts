import { getNextAuthSession } from "@/libs/next-auth";
import { bllService } from "@/services/bll";
import { ChangePasswordRequest } from "@/services/bll/modules/users/schema";
import { NextRequest, NextResponse } from "next/server";

export const patchChangePassword = async (req: NextRequest) => {
  const data = (await req.json()) as ChangePasswordRequest;
  const session = await getNextAuthSession();

  const response = await bllService.users.changePassword({
    ...data,
    userId: session?.user.id!,
  });

  return NextResponse.json(response, { status: 200 });
};
