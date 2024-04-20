import { getNextAuthSession } from "@/libs/next-auth";
import { bllService } from "@/services/bll";
import { EditUserProfileRequest } from "@/services/bll/modules/users/schema";
import { NextRequest, NextResponse } from "next/server";
import { formatFormData } from "../../utils";

export const patchEditUserProfile = async (req: NextRequest) => {
  const data = formatFormData<EditUserProfileRequest>(await req.formData());
  const session = await getNextAuthSession();

  const response = await bllService.users.editProfile({
    ...data,
    userId: session?.user.id!,
  });

  return NextResponse.json(response, { status: 200 });
};
