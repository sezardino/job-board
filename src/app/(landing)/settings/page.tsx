"use client";

import { LoadingOverlay } from "@/components/base/LoadingOverlay/LoadingOverlay";
import { SettingsProfileTemplate } from "@/components/templates/Shared/SettingsProfileTemplate";
import { useProfileContext } from "@/context";
import { useEditUserProfileMutation } from "@/hooks";

const SettingsPage = () => {
  const user = useProfileContext();
  const { mutateAsync: editProfile, isPending: isEditProfilePending } =
    useEditUserProfileMutation();

  return (
    <>
      {isEditProfilePending && <LoadingOverlay />}

      <SettingsProfileTemplate
        profile={user}
        editProfileAction={{
          handler: editProfile,
          isLoading: isEditProfilePending,
        }}
      />
    </>
  );
};

export default SettingsPage;
