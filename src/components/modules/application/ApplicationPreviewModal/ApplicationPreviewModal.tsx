import {
  Accordion,
  AccordionItem,
  Card,
  CardBody,
  CardHeader,
} from "@nextui-org/react";
import { FC, useState } from "react";

import { PDFViewerModal } from "@/components/UI/PDFViewerModal/PDFViewerModal";
import { TitleDescription } from "@/components/UI/TitleDescription/TitleDescription";
import { Badge } from "@/components/base/Badge/Badge";
import { Button } from "@/components/base/Button/Button";
import { Checkbox } from "@/components/base/Checkbox/Checkbox";
import { Grid } from "@/components/base/Grid/Grid";
import { Icon } from "@/components/base/Icon/Icon";
import { Input } from "@/components/base/Input/Input";
import { Modal } from "@/components/base/Modal/Modal";
import { BaseTextarea } from "@/components/base/Textarea/Textarea";
import { Typography } from "@/components/base/Typography/Typography";
import { CommentsFormValues } from "@/components/forms/Comments/CommentsForm";
import { APPLICATION_DATE_FORMAT } from "@/const";
import { OneApplicationResponse } from "@/services/bll/modules/application/schema/one";
import { QueryProps } from "@/types";
import dayjs from "dayjs";
import { useTranslations } from "next-intl";
import { Comments } from "../../shared/Comments/Comments";
import { NoteCard } from "../NoteCard/NoteCard";
import styles from "./ApplicationPreviewModal.module.scss";

export type ApplicationPreviewModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onAfterClose: () => void;
  application: QueryProps<OneApplicationResponse>;
  onCreateNote: (values: CommentsFormValues) => void;
};

const CANDIDATE_KEY = "candidate";
const BASIC_INFORMATION_KEY = "basic-information";

export const ApplicationPreviewModal: FC<ApplicationPreviewModalProps> = (
  props
) => {
  const { application, isOpen, onClose, onAfterClose, onCreateNote } = props;
  const t = useTranslations("components.shared.application-preview-modal");
  const [isCvModalOpen, setIsCvModalOpen] = useState(false);

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="5xl"
        onAfterClose={onAfterClose}
      >
        {application.isFetching && <Modal.Loader size="600" />}

        {!application.isFetching && (
          <>
            <Modal.Header className={styles.header}>
              <div className={styles.headerWrapper}>
                <TitleDescription
                  titleLevel="h2"
                  titleStyling="lg"
                  title={t("title")}
                  gap={0}
                  description={t("description")}
                />

                <Badge color="warning">{application.data?.status}</Badge>
              </div>
            </Modal.Header>

            <Modal.Body className={styles.body}>
              {application.data?.rejectedReason && (
                <Card>
                  <CardHeader>
                    <Typography tag="h3" styling="md">
                      {t("rejected-reason")}
                    </Typography>
                  </CardHeader>
                  <CardBody>
                    <Typography tag="p" styling="sm">
                      {application.data?.rejectedReason}
                    </Typography>
                  </CardBody>
                </Card>
              )}

              <Accordion
                defaultSelectedKeys={[CANDIDATE_KEY, BASIC_INFORMATION_KEY]}
                variant="splitted"
                selectionMode="multiple"
              >
                <AccordionItem
                  key={BASIC_INFORMATION_KEY}
                  textValue={t("basic.title")}
                  title={<Typography tag="span">{t("basic.title")}</Typography>}
                >
                  <ul className={styles.basic}>
                    <Grid gap={3}>
                      <Typography tag="h3" styling="md">
                        {t("basic.dates.title")}
                      </Typography>
                      <Grid gap={2}>
                        <Typography tag="p" styling="sm">
                          {t("basic.dates.applied-at", {
                            value: dayjs(application.data?.createdAt).format(
                              APPLICATION_DATE_FORMAT
                            ),
                          })}
                        </Typography>
                        <Typography tag="p" styling="sm">
                          {t("basic.dates.updated-at", {
                            value: dayjs(application.data?.updatedAt).format(
                              APPLICATION_DATE_FORMAT
                            ),
                          })}
                        </Typography>
                      </Grid>
                    </Grid>

                    <Grid gap={2}>
                      <Typography tag="h3" styling="md">
                        {t("basic.agreements.title")}
                      </Typography>

                      <Grid gap={1}>
                        <Checkbox
                          isReadOnly
                          checked={application.data?.dataProcessing}
                          label={t("basic.agreements.data-processing")}
                        />
                        <Checkbox
                          isReadOnly
                          checked={application.data?.futureRecruitment}
                          label={t("basic.agreements.future-recruitment")}
                        />
                      </Grid>
                    </Grid>
                  </ul>
                </AccordionItem>
                <AccordionItem
                  key={CANDIDATE_KEY}
                  textValue={t("candidate.title")}
                  title={
                    <Typography tag="span">{t("candidate.title")}</Typography>
                  }
                >
                  <Grid gap={2}>
                    <Input
                      isReadOnly
                      isDisabled
                      label={t("candidate.name")}
                      value={application.data?.name}
                    />
                    <Input
                      isReadOnly
                      isDisabled
                      label={t("candidate.email")}
                      value={application.data?.email}
                    />
                    <BaseTextarea
                      isDisabled
                      isReadOnly
                      label={t("candidate.message")}
                      disableAnimation
                      value={application.data?.message}
                    />
                    <Button
                      size="lg"
                      variant="bordered"
                      color="primary"
                      className={styles.cv}
                      onClick={() => setIsCvModalOpen(true)}
                      startContent={<Icon name="HiDocument" size={40} />}
                      text={t("candidate.cv")}
                    />
                  </Grid>
                </AccordionItem>

                <AccordionItem
                  key="notes"
                  title={
                    <div className={styles.notes}>
                      <Typography tag="span">{t("notes.title")}</Typography>
                      <Badge size="sm">{application.data?.notes.length}</Badge>
                    </div>
                  }
                  textValue={t("notes.title")}
                >
                  <Comments
                    copy={{
                      title: t("notes.title"),
                      noData: t("notes.empty"),
                      new: {
                        title: t("notes.form"),
                        trigger: t("notes.add"),
                      },
                    }}
                    isTitleHidden
                    comments={application.data?.notes || []}
                    onCreateComment={onCreateNote}
                    renderItem={(note) => (
                      <NoteCard
                        key={note.id}
                        author={note.author}
                        content={note.content}
                        createdAt={note.createdAt}
                        name={note.name}
                        shadow="none"
                      />
                    )}
                  />
                </AccordionItem>
              </Accordion>
            </Modal.Body>
            <Modal.Footer className={styles.footer}>
              <Button onClick={onClose} variant="bordered" text={t("close")} />
            </Modal.Footer>
          </>
        )}
      </Modal>

      <PDFViewerModal
        isOpen={isCvModalOpen}
        onClose={() => setIsCvModalOpen(false)}
        file={application.data?.curriculumVitae.url}
      />
    </>
  );
};
