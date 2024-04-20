import { getNextAuthSession } from "@/libs/next-auth";
import { bllService } from "@/services/bll";
import { NextResponse } from "next/server";

export const getCurrentUserProfile = async () => {
  const session = await getNextAuthSession();

  const user = await bllService.users.currentProfile(session?.user.id!);

  return NextResponse.json(user, { status: 200 });
};
