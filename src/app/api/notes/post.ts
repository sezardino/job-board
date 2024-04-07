import { getNextAuthSession } from "@/libs/next-auth";
import { bllService } from "@/services/bll";
import { NextRequest, NextResponse } from "next/server";

export const postCreateNote = async (req: NextRequest) => {
  const data = await req.json();
  const session = await getNextAuthSession();

  const success = await bllService.notes.create({
    ...data,
    companyId: session?.user.companyId!,
  });

  return NextResponse.json({ success }, { status: 200 });
};
