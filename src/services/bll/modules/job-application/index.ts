import { PrismaService } from "@/libs/prisma";
import {
  CustomException,
  NotAllowedException,
  NotFoundException,
} from "@/types";
import { JobApplicationStatus } from "@prisma/client";
import { AbstractBllService } from "../../module.abstract";
import { FilesBllModule } from "../files";
import {
  AddJobApplicationNoteRequest,
  ApplyForJobOfferRequest,
  ChangeJobApplicationStatusRequest,
  ChangeRejectedJobApplicationReasonRequest,
  JobOfferApplicationsRequest,
  JobOfferApplicationsStatisticsRequest,
} from "./schema";

const getDefaultCountObject = (): Record<JobApplicationStatus, number> => ({
  NEW: 0,
  PRE_SCREENING: 0,
  SCREENING: 0,
  INTERVIEW: 0,
  PRE_OFFER: 0,
  OFFER: 0,
  REJECTED: 0,
});

export class JobApplicationsBllModule extends AbstractBllService {
  constructor(
    prismaService: PrismaService,
    private readonly filesService: FilesBllModule
  ) {
    super(prismaService);
  }

  private async validateExists(applicationId: string, companyId: string) {
    const neededApplication =
      await this.prismaService.jobApplication.findUnique({
        where: { id: applicationId, jobOffer: { companyId } },
        select: { id: true, status: true },
      });

    if (!neededApplication)
      throw new NotFoundException("Application not found");

    return neededApplication;
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

  async list(dto: JobOfferApplicationsRequest & { companyId: string }) {
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
        _count: { select: { notes: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return applications;
  }

  async one(dto: { applicationId: string; companyId: string }) {
    const { applicationId, companyId } = dto;

    const application = await this.prismaService.jobApplication.findUnique({
      where: { id: applicationId, jobOffer: { companyId } },
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
        notes: {
          select: {
            id: true,
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
    dto: JobOfferApplicationsStatisticsRequest & { companyId: string }
  ) {
    const { offerId, companyId, search } = dto;

    const counts = await this.prismaService.jobApplication.groupBy({
      by: ["status"],
      where: {
        jobOfferId: offerId,
        jobOffer: { companyId },
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
    dto: ChangeJobApplicationStatusRequest & {
      applicationId: string;
      companyId: string;
    }
  ) {
    const { status, rejectedReason, applicationId, companyId } = dto;

    await this.validateExists(applicationId, companyId);

    const application = await this.prismaService.jobApplication.update({
      where: { id: applicationId },
      data: {
        status,
        rejectedReason,
      },
    });

    return !!application;
  }

  async changeRejectedReason(
    dto: ChangeRejectedJobApplicationReasonRequest & {
      applicationId: string;
      companyId: string;
    }
  ) {
    const { rejectedReason, applicationId, companyId } = dto;

    const neededApplication = await this.validateExists(
      applicationId,
      companyId
    );
    if (neededApplication.status !== JobApplicationStatus.REJECTED)
      throw new NotAllowedException("Application is not in rejected status");

    const application = await this.prismaService.jobApplication.update({
      where: { id: applicationId },
      data: { rejectedReason },
      select: { id: true },
    });

    return !!application;
  }

  async addNote(
    dto: AddJobApplicationNoteRequest & {
      companyId: string;
      applicationId: string;
      authorId: string;
    }
  ) {
    const { companyId, applicationId, content, authorId } = dto;

    await this.validateExists(applicationId, companyId);

    const newNote = await this.prismaService.jobApplicationNote.create({
      data: {
        content,
        application: { connect: { id: applicationId } },
        author: { connect: { id: authorId } },
      },
      select: { id: true },
    });

    return !!newNote;
  }
}
