import { serverService } from "@/services/server";
import { NextRequest } from "next/server";

export const POST = (req: NextRequest) =>
  serverService.users.controller.inviteUsers(req);
