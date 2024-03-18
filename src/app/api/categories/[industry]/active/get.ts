import { bllService } from "@/services/bll";
import {
  ActiveCategoriesRequest,
  ActiveCategoriesResponse,
} from "@/services/bll/modules/categories/schema";
import { NextResponse } from "next/server";

type Params = { params: ActiveCategoriesRequest };

export const getActiveCategories = async (_: any, params: Params) => {
  const res = await bllService.categories.activeList(params.params.industry);

  return NextResponse.json(res as ActiveCategoriesResponse, { status: 200 });
};
