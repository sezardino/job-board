import { getNextAuthSession } from "@/libs/next-auth";
import { bllService } from "@/services/bll";
import { EditCompanyResponse } from "@/services/bll/modules/companies/schema";
import { NextRequest, NextResponse } from "next/server";
import { formatFormData } from "../utils";

export const putEditCompany = async (req: NextRequest) => {
  const data = formatFormData(await req.formData());
  const session = await getNextAuthSession();

  const res = await bllService.companies.edit(data, session?.user.companyId!);

  return NextResponse.json(res as EditCompanyResponse, { status: 200 });
};
