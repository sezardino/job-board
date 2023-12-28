import { serverService } from "@/services/server";
import { NextRequest } from "next/server";

export const GET = (req: NextRequest) =>
  serverService.users.controller.company(req);
