import { Prisma } from "@prisma/client";

export const TEST_SV_NAME = "Test Curriculum Vitae";

export const generateCurriculumVitae =
  (): Prisma.CurriculumVitaeCreateInput => ({
    name: TEST_SV_NAME,
    url: "https://grad.illinois.edu/sites/default/files/pdfs/cvsamples.pdf",
  });
