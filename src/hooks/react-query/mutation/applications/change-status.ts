import { apiService } from "@/services/api";
import { ChangeApplicationStatusRequest } from "@/services/bll/modules/application/schema";
import { ApplicationStatus } from "@prisma/client";
import { useMutationHelper } from "../../helpers";
import { APPLICATION_LIST_QUERY_KEY } from "../../query";
import { OFFER_APPLICATIONS_STATISTICS_QUERY_KEY } from "../../query/applications/statistics";

type MutationDto = ChangeApplicationStatusRequest & {
  applicationId: string;
  oldStatus: ApplicationStatus;
  offerId: string;
};

export const useChangeApplicationStatusMutation = () =>
  useMutationHelper({
    mutationFn: ({ oldStatus, ...dto }: MutationDto) =>
      apiService.applications.changeStatus(dto),
    getQueriesToInvalidate: (data) => [
      [APPLICATION_LIST_QUERY_KEY, data.vars.offerId, data.vars.status],
      [APPLICATION_LIST_QUERY_KEY, data.vars.offerId, data.vars.oldStatus],
      [OFFER_APPLICATIONS_STATISTICS_QUERY_KEY, data.vars.offerId],
    ],
    successTranslationKey: "toasts.application.status-change.success",
    errorTranslationKey: "toasts.application.status-change.error",
  });
