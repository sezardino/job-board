import { getNextAuthSession } from "@/libs/next-auth";
import { bllService } from "@/services/bll";
import { EditUserProfileRequest } from "@/services/bll/modules/users/schema";
import { NextRequest, NextResponse } from "next/server";

export const patchEditUserProfile = async (req: NextRequest) => {
  const data = (await req.json()) as EditUserProfileRequest;
  const session = await getNextAuthSession();

  const response = await bllService.users.editProfile({
    ...data,
    userId: session?.user.id!,
  });

  return NextResponse.json(response, { status: 200 });
};
