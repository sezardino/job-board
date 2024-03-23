import { Button, ButtonProps, LoadingOverlay, Modal } from "@/components/base";
import NextLink from "next/link";
import { Fragment, type FC } from "react";

import {
  ModalWithDescription,
  ModalWithDescriptionProps,
} from "@/components/base/ModalWithDescription/ModalWithDescription";
import styles from "./ConfirmModal.module.scss";

type SideButtons = ButtonProps | [ButtonProps, ButtonProps];

export interface ConfirmModalProps
  extends Omit<ModalWithDescriptionProps, "children"> {
  buttons: [SideButtons, SideButtons];
  isLoading?: boolean;
}

export const ConfirmModal: FC<ConfirmModalProps> = (props) => {
  const { isLoading, onClose, buttons, className, ...rest } = props;

  return (
    <ModalWithDescription
      {...rest}
      onClose={onClose}
      className={styles.element}
    >
      {isLoading && <LoadingOverlay isInWrapper />}

      <Modal.Footer className={styles.footer}>
        {buttons.map((side, i) => (
          <Fragment key={i}>
            {Array.isArray(side) && (
              <div className={styles.wrapper}>
                {side.map((button, j) => (
                  <Button
                    key={j}
                    {...button}
                    as={button.href ? NextLink : undefined}
                    href={button.href}
                    color="primary"
                    size="md"
                    text={button.text}
                    onClick={button.onClick}
                  />
                ))}
              </div>
            )}
          </Fragment>
        ))}
      </Modal.Footer>
    </ModalWithDescription>
  );
};
