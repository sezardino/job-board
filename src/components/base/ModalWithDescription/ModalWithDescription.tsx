import { type FC } from "react";
import { Grid, Modal, ModalComponent, ModalProps, Typography } from "..";

export type ModalWithDescriptionProps = ModalProps & {
  title: string;
  description?: string;
  headerClassName?: string;
};

type ModalWithDescriptionComponent = FC<ModalWithDescriptionProps> &
  Pick<ModalComponent, "Body" | "Footer">;

export const ModalWithDescription: ModalWithDescriptionComponent = (props) => {
  const { title, description, headerClassName, children, className, ...rest } =
    props;

  return (
    <Modal {...rest}>
      <Modal.Header as={Grid}>
        <Typography tag="h2" styling="lg">
          {title}
        </Typography>

        {description && <Typography tag="p">{description}</Typography>}
      </Modal.Header>

      {children}
    </Modal>
  );
};

ModalWithDescription.Body = Modal.Body;
ModalWithDescription.Footer = Modal.Footer;
