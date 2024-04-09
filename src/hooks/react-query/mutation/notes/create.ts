import { apiService } from "@/services/api";
import { CreateNoteRequest } from "@/services/bll/modules/notes/schema";
import { ApplicationStatus } from "@prisma/client";
import { useMutationHelper } from "../../helpers";
import {
  APPLICATION_LIST_QUERY_KEY,
  ONE_APPLICATION_QUERY_KEY,
} from "../../query";

type CreateNoteMutation = CreateNoteRequest & {
  status: ApplicationStatus;
  offerId: string;
};

export const useCreateNoteMutation = () =>
  useMutationHelper({
    mutationFn: ({ status, offerId, ...data }: CreateNoteMutation) =>
      apiService.notes.create(data),
    getQueriesToInvalidate: (data) => [
      [APPLICATION_LIST_QUERY_KEY, data.vars.offerId, data.vars.status],
      [ONE_APPLICATION_QUERY_KEY, data.vars.applicationId],
    ],
  });
