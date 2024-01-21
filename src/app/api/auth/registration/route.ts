import { serverService } from "@/services/server";
import { NextRequest } from "next/server";

export const POST = (req: NextRequest) =>
  serverService.auth.controller.customerRegistration(req);
