import { PrismaService } from "@/libs/prisma";
import { CustomException, NotFoundException } from "@/types";
import { FilesBllModule } from "..";
import { AbstractBllService } from "../../module.abstract";
import { ApplyForJobOfferRequest } from "./schema";

export class JobApplicationsBllModule extends AbstractBllService {
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
      try {
        const file = await this.filesService.uploadCV(
          curriculumVitae,
          jobOffer.companyId
        );

        curriculumVitaeId = file.id;
      } catch (error) {
        throw new CustomException({
          message: "Error when try to upload CV",
          code: 500,
        });
      }
    }

    const jobApplication = await this.prismaService.jobApplication.create({
      data: {
        dataProcessing,
        email,
        name,
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
