"use client";

import { ProfileTemplate } from "@/components/templates/Customer/Profile/ProfileTemplate";
import { useDataOnPage } from "@/hooks";
import { useApplicationsHistoryQuery } from "@/hooks/react-query/query/applications/history";

const ProfilePage = () => {
  const { limit, onLimitChange, onPageChange, page } = useDataOnPage({
    limit: 25,
  });
  const historyQuery = useApplicationsHistoryQuery({ page, limit });

  return (
    <ProfileTemplate
      history={historyQuery}
      onLimitChange={onLimitChange}
      onPageChange={onPageChange}
      limit={limit}
      page={page}
    />
  );
};

export default ProfilePage;
