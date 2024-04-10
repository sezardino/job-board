import { APPLICATION_DATE_FORMAT } from "@/const";
import {
  Accordion,
  AccordionItem,
  Card,
  CardBody,
  CardHeader,
} from "@nextui-org/react";
import dayjs from "dayjs";
import { FC, useId } from "react";

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
import { NoteForm, NoteFormValues } from "@/components/forms/NoteForm/NoteForm";
import { OneApplicationResponse } from "@/services/bll/modules/application/schema/one";
import { QueryProps } from "@/types";
import { useTranslations } from "next-intl";
import { NoteCard } from "../NoteCard/NoteCard";
import styles from "./ApplicationPreviewModal.module.scss";

export type ApplicationPreviewModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onAfterClose: () => void;
  application: QueryProps<OneApplicationResponse>;
  onCreateNote: (values: NoteFormValues) => void;
};

export const ApplicationPreviewModal: FC<ApplicationPreviewModalProps> = (
  props
) => {
  const { application, isOpen, onClose, onAfterClose, onCreateNote } = props;
  const t = useTranslations("components.application-preview-modal");
  const noteFormId = useId();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="5xl"
      onAfterClose={onAfterClose}
    >
      <Modal.Header className={styles.header}>
        <div className={styles.headerWrapper}>
          <TitleDescription
            titleLevel="h2"
            titleStyling="lg"
            title={t("title")}
            description={t("description")}
          />

          <Badge color="warning">{application.data?.status}</Badge>
        </div>

        <div>
          <Typography tag="p" styling="sm">
            {t("applied-at", {
              value: dayjs(application.data?.createdAt).format(
                APPLICATION_DATE_FORMAT
              ),
            })}
          </Typography>
          <Typography tag="p" styling="sm">
            {t("updated-at", {
              value: dayjs(application.data?.updatedAt).format(
                APPLICATION_DATE_FORMAT
              ),
            })}
          </Typography>
        </div>
      </Modal.Header>

      <Modal.Body className={styles.body}>
        <section>
          <Typography tag="h3" styling="md">
            {t("agreements.title")}
          </Typography>

          <Grid gap={4}>
            <Checkbox
              isReadOnly
              checked={application.data?.dataProcessing}
              label={t("agreements.data-processing")}
            />
            <Checkbox
              isReadOnly
              checked={application.data?.futureRecruitment}
              label={t("agreements.future-recruitment")}
            />
          </Grid>
        </section>

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
          defaultSelectedKeys={["candidate"]}
          isCompact
          variant="bordered"
          selectionMode="multiple"
        >
          <AccordionItem key="candidate" title={t("candidate.title")}>
            <Grid gap={4} className={styles.wrapper}>
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
              >
                <Icon name="HiDocument" size={40} />
                {t("candidate.cv")}
              </Button>
            </Grid>
          </AccordionItem>

          <AccordionItem
            key="notes"
            title={
              <>
                <Typography tag="span" styling="sm">
                  {t("notes.title")}
                </Typography>
                <Badge size="sm">{application.data?.notes.length}</Badge>
              </>
            }
            textValue={t("notes.title")}
          >
            <Grid gap={4} className={styles.wrapper}>
              {application.data?.notes.length === 0 && (
                <Typography tag="p" styling="sm">
                  {t("notes.empty")}
                </Typography>
              )}

              {application.data?.notes.length && (
                <Grid tag="ul" gap={1}>
                  {application.data?.notes.map((note) => (
                    <NoteCard
                      as="li"
                      key={note.id}
                      author={note.author}
                      content={note.content}
                      createdAt={note.createdAt}
                      name={note.name}
                      shadow="none"
                    />
                  ))}
                </Grid>
              )}

              <Grid gap={4}>
                <Typography tag="h3" styling="md">
                  {t("notes.form")}
                </Typography>

                <NoteForm id={noteFormId} onFormSubmit={onCreateNote} />

                <Button form={noteFormId} type="submit">
                  {t("notes.add")}
                </Button>
              </Grid>
            </Grid>
          </AccordionItem>
        </Accordion>
      </Modal.Body>
      <Modal.Footer className={styles.footer}>
        <Button onClick={onClose} variant="bordered">
          {t("close")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
