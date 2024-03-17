import { bllService } from "@/services/bll";
import {
  ActiveCategoriesRequest,
  ActiveCategoriesResponse,
} from "@/services/bll/modules/categories/schema";
import { NextResponse } from "next/server";

export const getActiveCategories = async (
  _: any,
  data: {
    params: ActiveCategoriesRequest;
  }
) => {
  try {
    const res = await bllService.categories.activeList(data.params.industry);

    return NextResponse.json(res as ActiveCategoriesResponse, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Cant get active industries", error },
      { status: 500 }
    );
  }
};
