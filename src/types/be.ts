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

export enum StatisticPeriod {
  Week = "7",
  TwoWeeks = "14",
  Month = "30",
  Quarter = "90",
  Year = "365",
}

export enum StatisticChange {
  Increase = "increase",
  Decrease = "decrease",
  NoChange = "no-change",
}
