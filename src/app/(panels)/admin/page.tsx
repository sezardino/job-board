"use client";

import { AdminDashboardTemplate } from "@/components/templates/Admin/AdminDashboard/AdminDashboardTemplate";
import { useUsersStatisticsQuery } from "@/hooks";
import { StatisticPeriod } from "@/types";
import { useState } from "react";

const DashboardPage = () => {
  const [period, setPeriod] = useState<StatisticPeriod>(StatisticPeriod.Week);
  const statisticsQuery = useUsersStatisticsQuery({ period });

  return (
    <>
      <AdminDashboardTemplate
        selectedPeriod={period}
        onChangeSelectedPeriod={setPeriod}
        statistics={statisticsQuery}
      />
    </>
  );
};

export default DashboardPage;
