import { serverService } from "@/services/server";
import { NextApiRequest } from "next";
import { NextRequest } from "next/server";

export const POST = (req: NextRequest) =>
  serverService.industries.controller.create(req);

export const DELETE = (req: NextApiRequest) =>
  serverService.industries.controller.delete(req);
