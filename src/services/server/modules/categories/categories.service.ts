import { AbstractService } from "@/services/server/helpers";
import { Prisma } from "@prisma/client";

export class CategoriesService extends AbstractService {
  activeList(industry: string) {
    return this.findMany<Prisma.CategoryWhereInput, Prisma.CategorySelect>(
      {
        where: { status: "ACTIVE", industry: { name: industry } },
        select: {
          id: true,
          name: true,
        },
      },
      "category"
    );
  }
}
