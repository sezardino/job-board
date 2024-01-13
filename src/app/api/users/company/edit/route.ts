import { serverService } from "@/services/server";
import { NextRequest } from "next/server";

export const PATCH = (req: NextRequest) =>
  serverService.users.controller.editCompanyUser(req);
