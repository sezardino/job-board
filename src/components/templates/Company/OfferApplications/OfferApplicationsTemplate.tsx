import { Badge } from "@/components/base/Badge/Badge";
import {
  BaseBreadcrumbs,
  BreadcrumbItem,
} from "@/components/base/Breadcrumbs/BaseBreadcrumbs";
import { Grid } from "@/components/base/Grid/Grid";
import { Icon } from "@/components/base/Icon/Icon";
import { SearchForm } from "@/components/base/SearchForm/SearchForm";
import { Typography } from "@/components/base/Typography/Typography";
import { ApplicationStatusFormValues } from "@/components/forms/ApplicationStatus/ApplicationStatusForm";
import { ApplicationCard } from "@/components/modules/application/ApplicationCard/ApplicationCard";
import { EditApplicationStatusModal } from "@/components/modules/application/EditApplicationStatusModal/EditApplicationStatusModal";
import { OfferBasicData } from "@/components/modules/offer/OfferBasicData/OfferBasicData";
import { SkillsList } from "@/components/modules/offer/SkillsList/SkillsList";
import { ApplicationPreviewWrapper } from "@/components/wrappers/ApplicationPreviewWrapper";
import { CompanyPageUrls } from "@/const";
import { ChangeApplicationStatusRequest } from "@/services/bll/modules/application/schema";
import { OfferApplicationsResponse } from "@/services/bll/modules/application/schema/list";
import { OfferApplicationsStatisticsResponse } from "@/services/bll/modules/application/schema/offer-statistics";
import { OfferBasicDataResponse } from "@/services/bll/modules/offers/schema";
import { ActionProp, QueryProps } from "@/types";
import {
  Accordion,
  AccordionItem,
  ScrollShadow,
  Tab,
  Tabs,
} from "@nextui-org/react";
import { ApplicationStatus } from "@prisma/client";
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
  const [applicationToPreview, setApplicationToPreview] = useState<
    string | null
  >(null);
  const [isApplicationTpPreviewOpen, setIsApplicationToPreviewOpen] =
    useState(false);

  const openPreviewModal = useCallback((applicationId: string) => {
    setApplicationToPreview(applicationId);
    setIsApplicationToPreviewOpen(true);
  }, []);

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
      <div className={twMerge(styles.element)}>
        <BaseBreadcrumbs items={breadcrumbs} />
        <Grid tag="header" gap={4}>
          <div>
            <Typography tag="h1" styling="xl">
              {t("title", { value: basicData.data?.name })}
            </Typography>
            <Typography tag="p">{t("description")}</Typography>
          </div>

          <Accordion isCompact variant="bordered">
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
        </Grid>

        <SearchForm
          placeholder={t("search")}
          className="max-w-72"
          onSearch={onSearchChange}
        />

        <Tabs
          variant="underlined"
          selectedKey={activeStatus}
          onSelectionChange={(key) => onStatusChange(key as ApplicationStatus)}
        >
          {boardStatuses.map((status) => (
            <Tab
              key={status}
              value={status}
              isDisabled={
                applications[status].isFetching || statistics.isFetching
              }
              title={
                <div className={styles.tab}>
                  <Typography tag="h2" weight="bold" className={styles.title}>
                    {entityT(`status.${status}`)}
                  </Typography>
                  <Badge color="warning" variant="shadow" size="sm">
                    {statistics.isFetching && (
                      <Icon
                        name="TbLoader"
                        size={16}
                        className={styles.loader}
                      />
                    )}
                    <Typography tag="span" styling="xs">
                      {statistics.data?.data[status]}
                    </Typography>
                  </Badge>
                </div>
              }
              textValue={entityT(`status.${status}`)}
              className={styles.panel}
            >
              <ScrollShadow as="ul" className={styles.list}>
                {applications[status].data?.data.map((a) => (
                  <ApplicationCard
                    as="li"
                    key={a.id}
                    name={a.name}
                    email={a.email}
                    createdAt={a.createdAt}
                    notes={a._count.notes}
                    onAddNote={() => {}}
                    onEditStatus={() => setApplicationToEditStatus(a.id)}
                    onPreviewCV={() => {}}
                    onOpenPreview={() => openPreviewModal(a.id)}
                  />
                ))}
              </ScrollShadow>
            </Tab>
          ))}
        </Tabs>
      </div>

      <EditApplicationStatusModal
        isOpen={!!applicationToEditStatus}
        activeStatus={activeStatus!}
        onClose={() => setApplicationToEditStatus(null)}
        onChangeApplicationStatus={changeApplicationStatusHandler}
      />

      {applicationToPreview && (
        <ApplicationPreviewWrapper
          isOpen={isApplicationTpPreviewOpen}
          onClose={() => setIsApplicationToPreviewOpen(false)}
          applicationId={applicationToPreview}
          onAfterClose={() => setApplicationToPreview(null)}
        />
      )}
    </>
  );
};
