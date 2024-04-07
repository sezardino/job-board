import { Badge } from "@/components/base/Badge/Badge";
import {
  BaseBreadcrumbs,
  BreadcrumbItem,
} from "@/components/base/Breadcrumbs/BaseBreadcrumbs";
import { Button } from "@/components/base/Button/Button";
import { Grid } from "@/components/base/Grid/Grid";
import { Icon } from "@/components/base/Icon/Icon";
import { Modal } from "@/components/base/Modal/Modal";
import { SearchForm } from "@/components/base/SearchForm/SearchForm";
import { Typography } from "@/components/base/Typography/Typography";
import {
  ApplicationStatusForm,
  ApplicationStatusFormValues,
} from "@/components/forms/ApplicationStatus/ApplicationStatusForm";
import { OfferBasicData } from "@/components/modules/offer/OfferBasicData/OfferBasicData";
import { SkillsList } from "@/components/modules/offer/SkillsList/SkillsList";
import { CompanyPageUrls } from "@/const";
import { ChangeApplicationStatusRequest } from "@/services/bll/modules/application/schema";
import { OfferApplicationsResponse } from "@/services/bll/modules/application/schema/list";
import { OfferApplicationsStatisticsResponse } from "@/services/bll/modules/application/schema/offer-statistics";
import { OfferBasicDataResponse } from "@/services/bll/modules/offers/schema";
import { ActionProp, QueryProps } from "@/types";
import {
  Accordion,
  AccordionItem,
  Card,
  CardFooter,
  CardHeader,
} from "@nextui-org/react";
import { ApplicationStatus } from "@prisma/client";
import dayjs from "dayjs";
import { useTranslations } from "next-intl";
import { FC, useCallback, useMemo, useState } from "react";
import { twMerge } from "tailwind-merge";
import styles from "./OfferApplicationsTemplate.module.scss";

export type OfferApplicationsTemplateProps = {
  activeStatus: ApplicationStatus | null;
  onStatusChange: (status: ApplicationStatus | null) => void;
  onSearchChange: (search: string) => void;
  changeApplicationStatus: ActionProp<
    ChangeApplicationStatusRequest & { applicationId: string }
  >;
  basicData: QueryProps<OfferBasicDataResponse>;
  companyName: string;
  offerId: string;
  [ApplicationStatus.NEW]: QueryProps<OfferApplicationsResponse>;
  [ApplicationStatus.PRE_SCREENING]: QueryProps<OfferApplicationsResponse>;
  [ApplicationStatus.SCREENING]: QueryProps<OfferApplicationsResponse>;
  [ApplicationStatus.INTERVIEW]: QueryProps<OfferApplicationsResponse>;
  [ApplicationStatus.PRE_OFFER]: QueryProps<OfferApplicationsResponse>;
  [ApplicationStatus.OFFER]: QueryProps<OfferApplicationsResponse>;
  [ApplicationStatus.REJECTED]: QueryProps<OfferApplicationsResponse>;
  statistics: QueryProps<OfferApplicationsStatisticsResponse>;
};

const boardStatuses = Object.values(ApplicationStatus);

const APPLICATION_STATUS_FORM_ID = "application-status-form";

export const OfferApplicationsTemplate: FC<OfferApplicationsTemplateProps> = (
  props
) => {
  const {
    activeStatus,
    statistics,
    onStatusChange,
    onSearchChange,
    basicData,
    changeApplicationStatus,
    companyName,
    offerId,
    ...applications
  } = props;
  const t = useTranslations("page.company.offer-applications");
  const entityT = useTranslations("entity.applications");

  const [applicationToEditStatus, setApplicationToEditStatus] = useState<
    string | null
  >(null);

  const changeApplicationStatusHandler = useCallback(
    (values: ApplicationStatusFormValues) => {
      if (!applicationToEditStatus) return;

      try {
        changeApplicationStatus.handler({
          ...values,
          applicationId: applicationToEditStatus,
        });

        setApplicationToEditStatus(null);
      } catch (error) {}
    },
    [applicationToEditStatus, changeApplicationStatus]
  );

  const breadcrumbs = useMemo<BreadcrumbItem[]>(
    () => [
      { label: companyName, href: CompanyPageUrls.home },
      { label: t("offers"), href: CompanyPageUrls.offers },
      {
        label: basicData.data?.name || "",
        href: CompanyPageUrls.offer(offerId),
      },
      { label: t("applications") },
    ],
    [basicData.data?.name, companyName, offerId, t]
  );

  return (
    <>
      <Grid gap={4} className={twMerge(styles.element)}>
        <BaseBreadcrumbs items={breadcrumbs} />
        <header>
          <Typography tag="h1" styling="xl">
            {t("title", { value: basicData.data?.name })}
          </Typography>
          <Typography tag="p">{t("description")}</Typography>

          <Accordion variant="bordered">
            <AccordionItem
              textValue="Basic"
              isDisabled={basicData.isFetching}
              title="Basic information"
            >
              {!!basicData.data && (
                <>
                  <OfferBasicData
                    operating={basicData.data?.operating}
                    contract={basicData.data?.contract}
                    seniority={basicData.data?.seniority}
                    type={basicData.data?.type}
                  />
                  <SkillsList
                    title={t("skills.title")}
                    description={t("skills.description")}
                    noData={t("skills.no-data")}
                    isLoading={basicData.isFetching}
                    skills={basicData.data?.skills}
                  />
                </>
              )}
            </AccordionItem>
          </Accordion>
        </header>

        <SearchForm
          placeholder={t("search")}
          className="max-w-72"
          onSearch={onSearchChange}
        />

        <Accordion
          as="ul"
          selectedKeys={activeStatus ? [activeStatus] : []}
          onSelectionChange={(keys) =>
            onStatusChange(Array.from(keys)[0] as ApplicationStatus)
          }
          variant="light"
          className="list-none"
        >
          {boardStatuses.map((status) => (
            <AccordionItem
              as="li"
              key={status}
              textValue={entityT(`status.${status}`)}
              title={
                <div className="flex ga-1 items-center justify-between">
                  <Typography tag="h2" weight="bold">
                    {entityT(`status.${status}`)}
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
                    <CardHeader className="flex flex-wrap items-start justify-between">
                      <Grid gap={1}>
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
                      </Grid>
                      <div className="flex items-center">
                        <Button
                          isIconOnly
                          variant="light"
                          color="secondary"
                          tooltip="Edit status"
                          size="sm"
                          onClick={() => setApplicationToEditStatus(a.id)}
                        >
                          <Icon name="HiPencil" size={14} />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardFooter className="justify-between">
                      <Typography tag="p" styling="xs">
                        {t("applied-at", {
                          value: dayjs(a.createdAt).format("DD.MM.YYYY HH:mm"),
                        })}
                      </Typography>

                      <Badge size="sm">
                        <Typography tag="span" styling="xs">
                          {t("notes-count", { value: a._count.notes })}
                        </Typography>
                      </Badge>
                    </CardFooter>
                  </Card>
                ))}
              </ul>
            </AccordionItem>
          ))}
        </Accordion>
      </Grid>

      <Modal
        isOpen={!!applicationToEditStatus}
        placement="center"
        onClose={() => setApplicationToEditStatus(null)}
      >
        <Modal.Header>
          <Typography tag="h2" styling="md">
            {t("modals.change-status.title")}
          </Typography>
          <Typography tag="p">
            {t("modals.change-status.description")}
          </Typography>
        </Modal.Header>
        <Modal.Body>
          <ApplicationStatusForm
            id={APPLICATION_STATUS_FORM_ID}
            initialStatus={activeStatus!}
            onFormSubmit={changeApplicationStatusHandler}
          />
        </Modal.Body>
        <Modal.Footer className="flex justify-between items-center">
          <Button
            form={APPLICATION_STATUS_FORM_ID}
            type="reset"
            variant="bordered"
            onClick={() => setApplicationToEditStatus(null)}
          >
            {t("modals.change-status.cancel")}
          </Button>
          <Button
            form={APPLICATION_STATUS_FORM_ID}
            type="submit"
            color="primary"
          >
            {t("modals.change-status.confirm")}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
