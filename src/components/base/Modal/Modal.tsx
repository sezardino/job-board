import {
  Modal as Component,
  ModalProps as ComponentProps,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { ReactNode, type FC } from "react";
import { Typography } from "../..";

export type ModalProps = Omit<ComponentProps, "backdrop"> & {
  title?: string;
  description?: string;
  onClose: () => void;
  footer?: ReactNode;
};

export const Modal: FC<ModalProps> = (props) => {
  const { title, description, isOpen, onClose, footer, children, ...rest } =
    props;

  return (
    <Component {...rest} isOpen={isOpen} onClose={onClose} backdrop="blur">
      <ModalContent>
        {(title || description) && (
          <ModalHeader className="flex flex-col gap-1">
            {title && (
              <Typography tag="h2" styling="lg">
                {title}
              </Typography>
            )}

            {description && <Typography tag="p">{description}</Typography>}
          </ModalHeader>
        )}
        <ModalBody>{children}</ModalBody>

        {footer && <ModalFooter>{footer}</ModalFooter>}
      </ModalContent>
    </Component>
  );
};
