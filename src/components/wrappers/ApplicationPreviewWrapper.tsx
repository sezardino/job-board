import { APPLICATION_DATE_FORMAT } from "@/const";
import { useOneApplicationQuery } from "@/hooks";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Link,
} from "@nextui-org/react";
import dayjs from "dayjs";
import { FC, useState } from "react";
import { UserInfo } from "../UI/UserInfo/UserInfo";
import { Button } from "../base/Button/Button";
import { Checkbox } from "../base/Checkbox/Checkbox";
import { Icon } from "../base/Icon/Icon";
import { Modal } from "../base/Modal/Modal";
import { Typography } from "../base/Typography/Typography";

export type ApplicationPreviewWrapperProps = {
  applicationId: string;
  isOpen: boolean;
  onClose: () => void;
  onAfterClose: () => void;
};

export const ApplicationPreviewWrapper: FC<ApplicationPreviewWrapperProps> = (
  props
) => {
  const { applicationId, isOpen, onClose, onAfterClose } = props;

  const { data } = useOneApplicationQuery(applicationId);

  const [isShowedFullMessage, setIsShowedFullMessage] = useState(false);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="5xl"
      onAfterClose={onAfterClose}
    >
      <Modal.Header>
        <Typography tag="h2" styling="lg">
          Application Preview
        </Typography>

        {data?.status}

        <Checkbox
          isReadOnly
          checked={data?.dataProcessing}
          label="Data processing"
        />
        <Checkbox
          isReadOnly
          checked={data?.futureRecruitment}
          label="Future recruitment"
        />

        <Typography tag="p" styling="sm">
          Applied at - {dayjs(data?.createdAt).format(APPLICATION_DATE_FORMAT)}
        </Typography>
        <Typography tag="p" styling="sm">
          Updated at - {dayjs(data?.updatedAt).format(APPLICATION_DATE_FORMAT)}
        </Typography>
      </Modal.Header>

      <Modal.Body>
        <Typography tag="p" styling="sm">
          Name - {data?.name}
        </Typography>
        <Typography tag="p" styling="sm">
          Email - {data?.email}
        </Typography>

        <Typography tag="p" styling="sm">
          {data && data.message.length > 100 && (
            <>
              {isShowedFullMessage ? data.message : data.message.slice(0, 100)}{" "}
              <Link
                size="sm"
                onClick={() => setIsShowedFullMessage((prev) => !prev)}
              >
                {isShowedFullMessage ? "Show less" : "Show more"}
              </Link>
            </>
          )}
        </Typography>
        <Button size="lg" variant="bordered" color="primary">
          <Icon name="HiDocument" size={40} />
          CV
        </Button>

        <ul>
          {data?.notes.map((note) => (
            <Card key={note.id}>
              <CardHeader>
                <Typography tag="h3" styling="md">
                  {note.name}
                </Typography>
              </CardHeader>
              <CardBody>
                <Typography tag="p" styling="sm">
                  {note.author.name} - {note.content}
                </Typography>
              </CardBody>
              <CardFooter>
                <UserInfo
                  name={note.author.name}
                  email={note.author.email}
                  avatar={note.author.avatar}
                />
              </CardFooter>
            </Card>
          ))}
        </ul>
        {/* {data?.rejectedReason}
        {data?.notes} */}
      </Modal.Body>
      <Modal.Footer className="flex items-end">
        <Button onClick={onClose} variant="bordered">
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
