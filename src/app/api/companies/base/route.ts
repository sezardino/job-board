import { serverService } from "@/services/server";

export const GET = () => serverService.companies.controller.myCompanyBaseData();
