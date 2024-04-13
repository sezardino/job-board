import {
  AdminStatisticsRequest,
  adminStatisticsResponseSchema,
} from "@/services/bll/modules/statistics/schema";
import { AbstractApiModule } from "../helpers";

export class StatisticsApiModule extends AbstractApiModule {
  admin(params: AdminStatisticsRequest) {
    return this.fetch({
      endpoint: `statistics/admin`,
      config: { method: "GET", params },
      schema: adminStatisticsResponseSchema,
    });
  }
}
