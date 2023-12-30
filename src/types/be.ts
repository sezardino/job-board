import { NextResponse } from "next/server";
import { ZodIssue } from "zod";

export type FindManyPrismaEntity<Where, Select> = {
  where: Where;
  select: Select;
  page?: number;
  limit?: number;
};

export type BackendErrorResponse = NextResponse<{
  message: string;
  errors?: ZodIssue[];
}>;
