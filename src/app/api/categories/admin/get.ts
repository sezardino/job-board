import { bllService } from "@/services/bll";
import {
  AdminCategoriesRequest,
  AdminCategoriesResponse,
} from "@/services/bll/modules/categories/schema";
import { NextRequest, NextResponse } from "next/server";
import { formatUrlSearchParams } from "../../utils";

export const getCategoriesForManage = async (req: NextRequest) => {
  const params = formatUrlSearchParams<AdminCategoriesRequest>(
    req.nextUrl.searchParams
  );

  const res = await bllService.categories.admin(params);

  return NextResponse.json(res as AdminCategoriesResponse, { status: 200 });
};
