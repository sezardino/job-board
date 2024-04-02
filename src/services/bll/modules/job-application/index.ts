import { PrismaService } from "@/libs/prisma";
import { NotFoundException } from "@/types";
import { FilesBllModule } from "..";
import { AbstractBllService } from "../../module.abstract";
import { ApplyForJobOfferRequest } from "./schema";

export class JobApplicationBllModule extends AbstractBllService {
  constructor(
    prismaService: PrismaService,
    private readonly filesService: FilesBllModule
  ) {
    super(prismaService);
  }

  async apply(dto: ApplyForJobOfferRequest, userId?: string) {
    const {
      jobOfferId,
      curriculumVitae,
      dataProcessing,
      email,
      message,
      name,
      phone,
      futureRecruitment,
    } = dto;

    const jobOffer = await this.prismaService.jobOffer.findUnique({
      where: { id: jobOfferId },
      select: { id: true, companyId: true },
    });

    if (!jobOffer) throw new NotFoundException("Job offer not found");

    let curriculumVitaeId =
      typeof curriculumVitae === "string" ? curriculumVitae : null;

    if (!curriculumVitaeId) {
      const file = await this.filesService.uploadCV(
        curriculumVitae,
        jobOffer.companyId
      );

      curriculumVitaeId = file.id;
    }

    const jobApplication = await this.prismaService.jobApplication.create({
      data: {
        dataProcessing,
        email,
        name,
        phone,
        message,
        futureRecruitment,
        curriculumVitae: { connect: { id: curriculumVitaeId } },
        jobOffer: { connect: { id: jobOfferId } },
        user: userId ? { connect: { id: userId } } : undefined,
      },
      select: { id: true },
    });

    return !!jobApplication;
  }
}
