import { serverService } from "@/services/server";
import { NextRequest } from "next/server";

export const GET = () => serverService.companies.controller.myCompanyProfile();

export const PUT = (req: NextRequest) =>
  serverService.companies.controller.edit(req);
