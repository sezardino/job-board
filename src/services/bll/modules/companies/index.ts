import { PrismaService } from "@/libs/prisma";
import { hashService } from "@/services/hash";
import { emailVerificationTokenService } from "@/services/token";
import { NotFoundException } from "@/types";
import { daysToSeconds } from "@/utils/days-to-seconds";
import { generateSlug } from "@/utils/generate-slug";
import { Prisma, UserRoles } from "@prisma/client";
import { FilesBllModule } from "..";
import { AbstractBllService } from "../../module.abstract";
import { CompanyRegistrationRequest } from "../auth/schema/company-registration";
import {
  AdminCompaniesRequest,
  CompanyProfileRequest,
  EditCompanyRequest,
} from "./schema";

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
    const { bio, slogan, logo } = dto;

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

    // TODO: add in next version (gallery)
    // if (gallery) {
    //   const images = await this.filesService.uploadImages(gallery, companyId);

    // TODO: add in next version (gallery)
    //   if (images) {
    //     data.gallery = {
    //       connect: images.map((image) => ({ id: image.id })),
    //     };
    //   }
    // }

    // TODO: add in next version (gallery)
    // if (galleryDeleted) {
    //   data.gallery = {
    //     deleteMany: galleryDeleted.map((id) => ({ id })),
    //   };
    // }

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

  async profile(dto: CompanyProfileRequest) {
    const { id } = dto;

    const response = await this.prismaService.company.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        bio: true,
        slogan: true,
        logo: { select: { id: true, url: true, name: true } },
        // TODO: add in next version (gallery)
        // gallery: { select: { id: true, url: true, name: true } },
        // TODO: add in next version (thumbnail)
        // thumbnail: { select: { id: true, url: true, name: true } },
        _count: { select: { offers: true } },
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

    if (!company) throw new NotFoundException("Company not found");

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
