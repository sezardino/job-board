import { Badge } from "@/components/base/Badge/Badge";
import { SearchForm } from "@/components/base/SearchForm/SearchForm";
import { Typography } from "@/components/base/Typography/Typography";
import { JobOfferApplicationsStatisticsResponse } from "@/services/bll/modules/job-application/schema/job-offer-statistics";
import { JobOfferApplicationsResponse } from "@/services/bll/modules/job-application/schema/list";
import { QueryProps } from "@/types";
import {
  Accordion,
  AccordionItem,
  Card,
  CardFooter,
  CardHeader,
} from "@nextui-org/react";
import { JobApplicationStatus } from "@prisma/client";
import dayjs from "dayjs";
import { useTranslations } from "next-intl";
import { FC } from "react";
import { twMerge } from "tailwind-merge";
import styles from "./JobOfferApplicationsTemplate.module.scss";

export type JobOfferApplicationsTemplateProps = {
  activeStatus: JobApplicationStatus | null;
  onStatusChange: (status: JobApplicationStatus | null) => void;
  onSearchChange: (search: string) => void;
  [JobApplicationStatus.NEW]: QueryProps<JobOfferApplicationsResponse>;
  [JobApplicationStatus.PRE_SCREENING]: QueryProps<JobOfferApplicationsResponse>;
  [JobApplicationStatus.SCREENING]: QueryProps<JobOfferApplicationsResponse>;
  [JobApplicationStatus.INTERVIEW]: QueryProps<JobOfferApplicationsResponse>;
  [JobApplicationStatus.PRE_OFFER]: QueryProps<JobOfferApplicationsResponse>;
  [JobApplicationStatus.OFFER]: QueryProps<JobOfferApplicationsResponse>;
  [JobApplicationStatus.REJECTED]: QueryProps<JobOfferApplicationsResponse>;
  [JobApplicationStatus.CANCELED]: QueryProps<JobOfferApplicationsResponse>;
  statistics: QueryProps<JobOfferApplicationsStatisticsResponse>;
};

const boardStatuses = Object.values(JobApplicationStatus);

export const JobOfferApplicationsTemplate: FC<
  JobOfferApplicationsTemplateProps
> = (props) => {
  const {
    activeStatus,
    statistics,
    onStatusChange,
    onSearchChange,
    ...applications
  } = props;

  const entityT = useTranslations("entity");

  return (
    <div className={twMerge(styles.element)}>
      <SearchForm onSearch={onSearchChange} />

      <Accordion
        as="ul"
        selectedKeys={activeStatus ? [activeStatus] : []}
        onSelectionChange={(keys) =>
          onStatusChange(Array.from(keys)[0] as JobApplicationStatus)
        }
        className="list-none"
      >
        {boardStatuses.map((status) => (
          <AccordionItem
            as="li"
            key={status}
            title={
              <div className="flex ga-1 items-center">
                <Typography tag="h2" className="pr-4">
                  {entityT(`job-application.status.${status}`)}
                </Typography>
                <Badge color="warning" variant="shadow" size="sm">
                  <Typography tag="span" styling="xs">
                    {statistics.data?.data[status]}
                  </Typography>
                </Badge>
              </div>
            }
          >
            <ul className="list-none grid grid-cols-1 gap-2">
              {applications[status].data?.data.map((a) => (
                <Card
                  as="li"
                  key={a.id}
                  shadow="none"
                  radius="none"
                  className="border"
                >
                  <CardHeader>
                    <Typography
                      tag="h3"
                      styling="md"
                      className="grid grid-cols-1 gap-1"
                    >
                      {a.name}
                      <Typography tag="span" styling="xs">
                        {a.email}
                      </Typography>
                    </Typography>
                  </CardHeader>
                  <CardFooter className="justify-between">
                    <Typography tag="p" styling="xs">
                      Applied date:{" "}
                      {dayjs(a.createdAt).format("DD.MM.YYYY HH:mm")}
                    </Typography>

                    <Badge size="sm">
                      <Typography tag="span" styling="xs">
                        Notes:
                        {a._count.notes}
                      </Typography>
                    </Badge>
                  </CardFooter>
                </Card>
              ))}
            </ul>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};
