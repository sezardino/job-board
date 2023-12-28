import { PrismaService } from "@/libs/prisma";
import { AbstractModule } from "@/services/server/helpers";
import { JobOffersController } from "./job-offers.controller";
import { JobOffersService } from "./job-offers.service";

export class JobOffersModule
  implements AbstractModule<JobOffersController, JobOffersService>
{
  controller: JobOffersController;
  service: JobOffersService;

  constructor(private readonly prismaService: PrismaService) {
    this.service = new JobOffersService(prismaService);
    this.controller = new JobOffersController(this.service);
  }
}
