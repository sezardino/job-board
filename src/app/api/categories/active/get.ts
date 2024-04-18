import { bllService } from "@/services/bll";
import {
  ActiveCategoriesRequest,
  ActiveCategoriesResponse,
} from "@/services/bll/modules/categories/schema";
import { NextRequest, NextResponse } from "next/server";
import { formatUrlSearchParams } from "../../utils";

export const getActiveCategories = async (req: NextRequest) => {
  const params = formatUrlSearchParams<ActiveCategoriesRequest>(
    req.nextUrl.searchParams
  );

  const res = await bllService.categories.activeList(params.industryId);

  return NextResponse.json(res as ActiveCategoriesResponse, { status: 200 });
};
