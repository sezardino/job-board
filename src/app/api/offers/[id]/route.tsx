import { serverService } from "@/services/server";

type SecondArg = {
  params: { id: string };
};

export const GET = (_: any, second: SecondArg) =>
  serverService.jobOffers.controller.one(second.params.id);
