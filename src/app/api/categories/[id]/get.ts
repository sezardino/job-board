import { bllService } from "@/services/bll";
import { NextResponse } from "next/server";

export const getBaseCategoryData = async (
  _: any,
  params: { params: { id: string } }
) => {
  const res = await bllService.categories.baseData(params.params.id);

  return NextResponse.json(res, { status: 200 });
};
