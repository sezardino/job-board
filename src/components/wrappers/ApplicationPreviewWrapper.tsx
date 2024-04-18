import { useOneApplicationQuery } from "@/hooks";
import { useCreateNoteMutation } from "@/hooks/react-query/mutation/notes";
import { FC, useCallback } from "react";
import { LoadingOverlay } from "../base/LoadingOverlay/LoadingOverlay";
import { CommentsFormValues } from "../forms/Comments/CommentsForm";
import { ApplicationPreviewModal } from "../modules/application/ApplicationPreviewModal/ApplicationPreviewModal";

export type ApplicationPreviewWrapperProps = {
  applicationId: string;
  offerId: string;
  isOpen: boolean;
  onClose: () => void;
  onAfterClose: () => void;
};

export const ApplicationPreviewWrapper: FC<ApplicationPreviewWrapperProps> = (
  props
) => {
  const { offerId, applicationId, isOpen, onClose, onAfterClose } = props;

  const applicationQuery = useOneApplicationQuery(applicationId);
  const { mutate: createNote, isPending: isCreateNoteLoading } =
    useCreateNoteMutation();

  const createNoteHandler = useCallback(
    async (values: CommentsFormValues) => {
      if (!applicationQuery.data) return;

      createNote({
        ...values,
        offerId,
        applicationId,
        status: applicationQuery.data?.status,
      });
    },
    [applicationId, applicationQuery.data, createNote, offerId]
  );

  const isLoading = isCreateNoteLoading;

  return (
    <>
      {isLoading && <LoadingOverlay />}

      <ApplicationPreviewModal
        application={applicationQuery}
        isOpen={isOpen}
        onClose={onClose}
        onAfterClose={onAfterClose}
        onCreateNote={createNoteHandler}
      />
    </>
  );
};
