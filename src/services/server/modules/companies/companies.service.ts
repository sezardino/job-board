import { PrismaService } from "@/libs/prisma";
import { AbstractService } from "@/services/server/helpers";
import { Prisma } from "@prisma/client";
import { FilesService } from "../files/files.service";
import { AdminCompaniesRequest, EditCompanyRequest } from "./schema";

export class CompaniesService extends AbstractService {
  constructor(
    prismaService: PrismaService,
    private readonly filesService: FilesService
  ) {
    super(prismaService);
  }

  async admin(dto: AdminCompaniesRequest) {
    const { limit = 10, page = 0, search } = dto;

    const where: Prisma.CompanyWhereInput = {};

    if (search) where.name = { contains: search, mode: "insensitive" };

    const count = await this.prismaService.company.count({ where });
    const { meta, skip, take } = this.getPagination({ page, limit, count });

    const companies = await this.prismaService.company.findMany({
      orderBy: {
        name: "asc",
      },
      select: {
        id: true,
        name: true,
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        status: true,
        _count: {
          select: {
            offers: true,
            members: true,
          },
        },
      },
      skip,
      take,
      where,
    });

    return { companies, meta };
  }

  async edit(dto: EditCompanyRequest, companyId: string) {
    const { bio, slogan, isLogoDeleted, logo } = dto;

    const data: Prisma.CompanyUpdateInput = {};

    if (bio) data.bio = bio;
    if (slogan) data.catchPhrase = slogan;
    if (isLogoDeleted) data.logo!.delete = true;
    if (logo) {
      const image = await this.filesService.uploadImage(logo, companyId);

      if (image) {
        data.logo = {
          connect: { id: image.id },
        };
      }
    }

    return await this.prismaService.company.update({
      where: { id: companyId },
      data,
      select: {
        id: true,
        name: true,
        bio: true,
      },
    });
  }

  async my(companyId: string) {
    const response = await this.prismaService.company.findUnique({
      where: { id: companyId },
      select: {
        id: true,
        name: true,
        bio: true,
        catchPhrase: true,
        logo: { select: { id: true, url: true, name: true } },
        gallery: { select: { id: true, url: true, name: true } },
        thumbnail: { select: { id: true, url: true, name: true } },
        offers: {
          take: 5,
          select: { id: true, name: true, level: true, salary: true },
        },
        _count: {
          select: {
            offers: true,
            members: { where: { isAcceptInvite: true } },
          },
        },
      },
    });

    return response;
  }
}
