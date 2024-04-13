import { Badge } from "@/components/base/Badge/Badge";
import { Button } from "@/components/base/Button/Button";
import { Grid } from "@/components/base/Grid/Grid";
import { Icon } from "@/components/base/Icon/Icon";
import { Typography } from "@/components/base/Typography/Typography";
import { APPLICATION_DATE_FORMAT } from "@/const";
import { Card, CardFooter, CardHeader, CardProps } from "@nextui-org/react";
import dayjs from "dayjs";
import { useTranslations } from "next-intl";
import { FC } from "react";

type Props = {
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  notes: number;
  onOpenPreview: () => void;
  onPreviewCV: () => void;
  onAddNote: () => void;
  onEditStatus: () => void;
};

export type ApplicationCardProps = CardProps & Props;

export const ApplicationCard: FC<ApplicationCardProps> = (props) => {
  const {
    name,
    email,
    notes,
    createdAt,
    updatedAt,
    onOpenPreview,
    onAddNote,
    onPreviewCV,
    onEditStatus,
    ...rest
  } = props;

  const t = useTranslations("page.company.offer-applications");

  return (
    <Card {...rest} as="li" shadow="none" radius="none" className="border">
      <CardHeader className="flex flex-wrap items-start justify-between">
        <Grid gap={1}>
          <Typography tag="h3" styling="md" className="grid grid-cols-1 gap-1">
            {name}
            <Typography tag="span" styling="xs">
              {email}
            </Typography>
          </Typography>
        </Grid>
        <div className="flex items-center">
          <Button
            isIconOnly
            variant="light"
            color="warning"
            text="See full information"
            size="sm"
            onClick={onOpenPreview}
            endContent={<Icon name="HiEye" size={14} />}
          />

          <Button
            isIconOnly
            variant="light"
            color="secondary"
            text="See CV"
            size="sm"
            onClick={onPreviewCV}
            endContent={<Icon name="HiDocument" size={14} />}
          />
          <Button
            isIconOnly
            variant="light"
            color="secondary"
            text="Add note"
            size="sm"
            onClick={onAddNote}
            endContent={<Icon name="HiDocumentAdd" size={14} />}
          />
          <Button
            isIconOnly
            variant="light"
            color="secondary"
            text="Edit status"
            size="sm"
            onClick={onEditStatus}
            endContent={<Icon name="HiPencil" size={14} />}
          />
        </div>
      </CardHeader>
      <CardFooter className="justify-between">
        <Grid gap={1}>
          <Typography tag="p" styling="xs">
            {t("applied-at", {
              value: dayjs(createdAt).format(APPLICATION_DATE_FORMAT),
            })}
          </Typography>
          {dayjs(updatedAt).isAfter(createdAt) && (
            <Typography tag="p" styling="xs">
              {t("updated-at", {
                value: dayjs(updatedAt).format(APPLICATION_DATE_FORMAT),
              })}
            </Typography>
          )}
        </Grid>

        <Badge color="warning" size="sm">
          <Typography tag="span" styling="xs">
            {t("notes-count", { value: notes })}
          </Typography>
        </Badge>
      </CardFooter>
    </Card>
  );
};
