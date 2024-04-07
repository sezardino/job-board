import { PrismaService } from "@/libs/prisma";
import { CustomException, NotFoundException } from "@/types";
import { JobApplicationStatus } from "@prisma/client";
import { FilesBllModule } from "..";
import { AbstractBllService } from "../../module.abstract";
import { ApplyForJobOfferRequest } from "./schema";
import { JobOfferApplicationsStatisticsRequest } from "./schema/job-offer-statistics";
import { JobOfferApplicationsRequest } from "./schema/list";

const getDefaultCountObject = (): Record<JobApplicationStatus, number> => ({
  NEW: 0,
  PRE_SCREENING: 0,
  SCREENING: 0,
  INTERVIEW: 0,
  PRE_OFFER: 0,
  OFFER: 0,
  REJECTED: 0,
  CANCELED: 0,
});

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

  async list(dto: JobOfferApplicationsRequest) {
    const { offerId, status, search } = dto;

    const applications = await this.prismaService.jobApplication.findMany({
      where: {
        jobOfferId: offerId,
        status,
        OR: search
          ? [
              { name: { contains: search, mode: "insensitive" } },
              { email: { contains: search, mode: "insensitive" } },
            ]
          : undefined,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        dataProcessing: true,
        futureRecruitment: true,
        _count: { select: { notes: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return applications;
  }

  async offerStatistics(dto: JobOfferApplicationsStatisticsRequest) {
    const { offerId, search } = dto;

    const counts = await this.prismaService.jobApplication.groupBy({
      by: ["status"],
      where: {
        jobOfferId: offerId,
        OR: search
          ? [
              { name: { contains: search, mode: "insensitive" } },
              { email: { contains: search, mode: "insensitive" } },
            ]
          : undefined,
      },
      _count: true,
    });

    const statistics = counts.reduce((acc, item) => {
      acc[item.status] = item._count;
      return acc;
    }, getDefaultCountObject());

    return statistics;
  }
}
