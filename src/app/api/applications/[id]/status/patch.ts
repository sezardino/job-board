import { getNextAuthSession } from "@/libs/next-auth";
import { bllService } from "@/services/bll";
import { NextRequest, NextResponse } from "next/server";

export const patchEditApplicationStatus = async (
  req: NextRequest,
  params: { params: { id: string } }
) => {
  const data = await req.json();
  const session = await getNextAuthSession();

  const success = await bllService.applications.changeStatus({
    ...data,
    applicationId: params.params.id,
    companyId: session?.user.companyId!,
  });

  return NextResponse.json({ success }, { status: 200 });
};
