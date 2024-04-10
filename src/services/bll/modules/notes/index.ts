import { PrismaService } from "@/libs/prisma";
import { AbstractBllService } from "../../module.abstract";
import { ApplicationsBllModule } from "../application";
import { CreateNoteRequest } from "./schema";

export class NotesBllModule extends AbstractBllService {
  constructor(
    prismaService: PrismaService,
    private readonly applicationsService: ApplicationsBllModule
  ) {
    super(prismaService);
  }

  async create(
    dto: CreateNoteRequest & {
      companyId: string;
      applicationId: string;
      authorId: string;
    }
  ) {
    const { name, companyId, applicationId, content, authorId } = dto;

    await this.applicationsService.validateExists(applicationId, companyId);

    const newNote = await this.prismaService.note.create({
      data: {
        name,
        content,
        application: { connect: { id: applicationId } },
        author: { connect: { id: authorId } },
      },
      select: { id: true },
    });

    return !!newNote;
  }
}
