import { PrismaService } from "@/libs/prisma";
import { hashService } from "@/services/hash";
import { AbstractService } from "@/services/server/helpers";
import { emailVerificationTokenService } from "@/services/token";
import { daysToSeconds } from "@/utils/days-to-seconds";
import { generateSlug } from "@/utils/generate-slug";
import { Prisma, UserRoles } from "@prisma/client";
import { CompanyRegistrationRequest } from "../auth/schema/company-registration";
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

    return { data: companies, meta };
  }

  async edit(dto: EditCompanyRequest, companyId: string) {
    const { bio, slogan, logo, gallery, galleryDeleted } = dto;

    const data: Prisma.CompanyUpdateInput = {};

    if (bio) data.bio = bio;
    if (slogan) data.slogan = slogan;
    if (logo) {
      const image = await this.filesService.uploadImage(logo, companyId);

      if (image) {
        data.logo = {
          connect: { id: image.id },
        };
      }
    }

    if (gallery) {
      const images = await this.filesService.uploadImages(gallery, companyId);

      if (images) {
        data.gallery = {
          connect: images.map((image) => ({ id: image.id })),
        };
      }
    }

    if (galleryDeleted) {
      data.gallery = {
        deleteMany: galleryDeleted.map((id) => ({ id })),
      };
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

  async profile(companyId: string) {
    const response = await this.prismaService.company.findUnique({
      where: { id: companyId },
      select: {
        id: true,
        name: true,
        bio: true,
        slogan: true,
        logo: { select: { id: true, url: true, name: true } },
        gallery: { select: { id: true, url: true, name: true } },
        thumbnail: { select: { id: true, url: true, name: true } },
        _count: { select: { offers: true } },
        offers: {
          take: 5,
          select: {
            id: true,
            name: true,
            level: true,
            salary: true,
            createdAt: true,
            skills: { select: { name: true } },
            company: {
              select: {
                id: true,
                name: true,
                logo: { select: { id: true, url: true, name: true } },
              },
            },
          },
        },
      },
    });

    return response;
  }

  baseData(companyId: string) {
    return this.prismaService.company.findUnique({
      where: { id: companyId },
      select: {
        id: true,
        name: true,
        slogan: true,
        logo: { select: { id: true, url: true, name: true } },
      },
    });
  }

  async createNewCompany(dto: CompanyRegistrationRequest) {
    const { company, owner } = dto;

    const hashedPassword = await hashService.hash(owner.password);
    const verificationToken = emailVerificationTokenService.generate({
      payload: { email: owner.email },
      expiresIn: daysToSeconds(1),
    });

    const response = await this.prismaService.company.create({
      data: {
        name: company.name,
        location: company.location,
        slug: generateSlug(company.name),
        owner: {
          create: {
            name: owner.name,
            email: owner.email,
            password: hashedPassword,
            role: UserRoles.OWNER,
            emailToken: verificationToken,
          },
        },
      },
      select: { owner: true },
    });

    return { owner: { ...response.owner, emailToken: verificationToken } };
  }

  async checkNameAvailable(name: string) {
    return await this.prismaService.company.findUnique({
      where: { name },
      select: { id: true },
    });
  }
}
