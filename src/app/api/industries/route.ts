import { serverService } from "@/services/server";
import { NextRequest } from "next/server";

export const POST = (req: NextRequest) =>
  serverService.industries.controller.create(req);

export const DELETE = (req: NextRequest) =>
  serverService.industries.controller.delete(req);

export const PATCH = (req: NextRequest) =>
  serverService.industries.controller.update(req);
