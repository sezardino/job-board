import { getNextAuthSession } from "@/libs/next-auth";
import { bllService } from "@/services/bll";
import { NextRequest, NextResponse } from "next/server";
import { formatUrlSearchParams } from "../../utils";

export const getApplication = async (
  req: NextRequest,
  params: { params: { id: string } }
) => {
  const body = formatUrlSearchParams(req.nextUrl.searchParams);
  const session = await getNextAuthSession();

  const res = await bllService.jobApplications.one({
    ...body,
    applicationId: params.params.id,
    companyId: session?.user?.companyId!,
  });

  return NextResponse.json(res, { status: 200 });
};
