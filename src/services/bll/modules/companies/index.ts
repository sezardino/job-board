import { PrismaService } from "@/libs/prisma";
import { hashService } from "@/services/hash";
import { emailVerificationTokenService } from "@/services/token";
import { daysToSeconds } from "@/utils/days-to-seconds";
import { generateSlug } from "@/utils/generate-slug";
import { Prisma, UserRoles } from "@prisma/client";
import { FilesBllModule } from "..";
import { AbstractBllService } from "../../module.abstract";
import { NotFoundBllError } from "../../types";
import { CompanyRegistrationRequest } from "../auth/schema/company-registration";
import { AdminCompaniesRequest, EditCompanyRequest } from "./schema";

export class CompaniesBllModule extends AbstractBllService {
  constructor(
    prismaService: PrismaService,
    private readonly filesService: FilesBllModule
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
        status: true,
        members: {
          where: { role: UserRoles.OWNER },
          select: { id: true, name: true, email: true },
        },
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

    return {
      data: companies.map(({ members, ...rest }) => ({
        ...rest,
        owner: members[0],
      })),
      meta,
    };
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
        // thumbnail: { select: { id: true, url: true, name: true } },
        _count: { select: { offers: true } },
        offers: {
          take: 5,
          select: {
            id: true,
            name: true,
            seniority: true,
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

  async baseData(companyId: string) {
    const company = await this.prismaService.company.findUnique({
      where: { id: companyId },
      select: {
        id: true,
        name: true,
        slogan: true,
        logo: { select: { id: true, url: true, name: true } },
      },
    });

    if (!company) throw new NotFoundBllError("Company not found");

    return company;
  }

  async createNewCompany(dto: CompanyRegistrationRequest) {
    const { company, owner } = dto;

    const hashedPassword = await hashService.hash(owner.password);
    const verificationToken = emailVerificationTokenService.generate({
      payload: { email: owner.email },
      expiresIn: daysToSeconds(1),
    });

    return await this.prismaService.user.create({
      data: {
        name: owner.name,
        email: owner.email,
        password: hashedPassword,
        role: UserRoles.OWNER,
        emailToken: verificationToken,
        inviteToken: "",
        isAcceptInvite: true,
        company: {
          create: {
            name: company.name,
            location: company.location,
            slug: generateSlug(company.name),
          },
        },
      },
      select: { id: true, emailToken: true, name: true, email: true },
    });
  }

  async checkNameAvailable(name: string) {
    return await this.prismaService.company.findUnique({
      where: { name },
      select: { id: true },
    });
  }
}
