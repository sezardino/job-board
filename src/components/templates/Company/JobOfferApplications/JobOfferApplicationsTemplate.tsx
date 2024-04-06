import { Typography } from "@/components/base/Typography/Typography";
import { JobOfferApplicationsResponse } from "@/services/bll/modules/job-application/schema/list";
import { DataProp } from "@/types";
import { JobApplicationStatus } from "@prisma/client";
import { FC, useMemo } from "react";
import { twMerge } from "tailwind-merge";
import styles from "./JobOfferApplicationsTemplate.module.scss";

export type JobOfferApplicationsTemplateProps = {
  applications: DataProp<JobOfferApplicationsResponse>;
};

type OneApplication = JobOfferApplicationsResponse["data"][number];

const emptyBoard: Record<JobApplicationStatus, OneApplication[]> =
  Object.values(JobApplicationStatus).reduce(
    (acc, status) => ({ ...acc, [status]: [] }),
    {} as Record<JobApplicationStatus, OneApplication[]>
  );

const sortApplicationsByStatus = (applications: OneApplication[]) => {
  const statuses = Object.values(JobApplicationStatus);

  const sortedOffers = emptyBoard;

  statuses.forEach((status) => {
    sortedOffers[status] = applications.filter((a) => a.status === status);
  });

  return sortedOffers;
};

export const JobOfferApplicationsTemplate: FC<
  JobOfferApplicationsTemplateProps
> = (props) => {
  const { applications } = props;

  const sortedApplications = useMemo(
    () =>
      applications.data
        ? sortApplicationsByStatus(applications.data?.data)
        : emptyBoard,
    [applications.data]
  );

  return (
    <div className={twMerge(styles.element)}>
      <ul className="flex gap-4 list-none overflow-x-auto">
        {Object.keys(sortedApplications).map((status) => (
          <li key={status} className="min-w-80">
            <ul className="flex flex-col overflow-y-auto max-h-full">
              <Typography tag="h3">{status}</Typography>
              {sortedApplications[status as JobApplicationStatus].map(
                (column) => (
                  <li key={column.id}>{column.name}</li>
                )
              )}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};
