import { PrismaService } from "@/libs/prisma";
import {
  CustomException,
  NotAllowedException,
  NotFoundException,
} from "@/types";
import { ApplicationStatus } from "@prisma/client";
import { AbstractBllService } from "../../module.abstract";
import { FilesBllModule } from "../files";
import {
  ApplyForOfferRequest,
  ChangeApplicationStatusRequest,
  ChangeRejectedApplicationReasonRequest,
  OfferApplicationsRequest,
  OfferApplicationsStatisticsRequest,
} from "./schema";

const getDefaultCountObject = (): Record<ApplicationStatus, number> => ({
  NEW: 0,
  PRE_SCREENING: 0,
  SCREENING: 0,
  INTERVIEW: 0,
  PRE_OFFER: 0,
  OFFER: 0,
  REJECTED: 0,
});

export class ApplicationsBllModule extends AbstractBllService {
  constructor(
    prismaService: PrismaService,
    private readonly filesService: FilesBllModule
  ) {
    super(prismaService);
  }

  async validateExists(applicationId: string, companyId: string) {
    const neededApplication = await this.prismaService.application.findUnique({
      where: { id: applicationId, offer: { companyId } },
      select: { id: true, status: true },
    });

    if (!neededApplication)
      throw new NotFoundException("Application not found");

    return neededApplication;
  }

  async apply(dto: ApplyForOfferRequest, userId?: string) {
    const {
      offerId,
      curriculumVitae,
      dataProcessing,
      email,
      message,
      name,
      futureRecruitment,
    } = dto;

    const offer = await this.prismaService.offer.findUnique({
      where: { id: offerId },
      select: { id: true, companyId: true },
    });

    if (!offer) throw new NotFoundException("Offer not found");

    let curriculumVitaeId =
      typeof curriculumVitae === "string" ? curriculumVitae : null;

    if (!curriculumVitaeId) {
      try {
        const file = await this.filesService.uploadCV(
          curriculumVitae,
          offer.companyId
        );

        curriculumVitaeId = file.id;
      } catch (error) {
        throw new CustomException({
          message: "Error when try to upload CV",
          code: 500,
        });
      }
    }

    const application = await this.prismaService.application.create({
      data: {
        dataProcessing,
        email,
        name,
        message,
        futureRecruitment,
        curriculumVitae: { connect: { id: curriculumVitaeId } },
        offer: { connect: { id: offerId } },
        user: userId ? { connect: { id: userId } } : undefined,
      },
      select: { id: true },
    });

    return !!application;
  }

  async list(dto: OfferApplicationsRequest & { companyId: string }) {
    const { offerId, status, search } = dto;

    const applications = await this.prismaService.application.findMany({
      where: {
        offerId,
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
        _count: { select: { notes: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return applications;
  }

  async one(dto: { applicationId: string; companyId: string }) {
    const { applicationId, companyId } = dto;

    const application = await this.prismaService.application.findUnique({
      where: { id: applicationId, offer: { companyId } },
      select: {
        id: true,
        name: true,
        email: true,
        message: true,
        dataProcessing: true,
        futureRecruitment: true,
        status: true,
        rejectedReason: true,
        curriculumVitae: { select: { id: true, url: true } },
        createdAt: true,
        updatedAt: true,
        notes: {
          select: {
            id: true,
            name: true,
            content: true,
            createdAt: true,
            author: {
              select: { id: true, name: true, avatar: true, email: true },
            },
          },
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!application) throw new NotFoundException("Application not found");

    return application;
  }

  async offerStatistics(
    dto: OfferApplicationsStatisticsRequest & { companyId: string }
  ) {
    const { offerId, companyId, search } = dto;

    const counts = await this.prismaService.application.groupBy({
      by: ["status"],
      where: {
        offerId,
        offer: { companyId },
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

  async changeStatus(
    dto: ChangeApplicationStatusRequest & {
      applicationId: string;
      companyId: string;
    }
  ) {
    const { status, rejectedReason, applicationId, companyId } = dto;

    await this.validateExists(applicationId, companyId);

    const application = await this.prismaService.application.update({
      where: { id: applicationId },
      data: {
        status,
        rejectedReason,
      },
    });

    return !!application;
  }

  async changeRejectedReason(
    dto: ChangeRejectedApplicationReasonRequest & {
      applicationId: string;
      companyId: string;
    }
  ) {
    const { rejectedReason, applicationId, companyId } = dto;

    const neededApplication = await this.validateExists(
      applicationId,
      companyId
    );
    if (neededApplication.status !== ApplicationStatus.REJECTED)
      throw new NotAllowedException("Application is not in rejected status");

    const application = await this.prismaService.application.update({
      where: { id: applicationId },
      data: { rejectedReason },
      select: { id: true },
    });

    return !!application;
  }
}
