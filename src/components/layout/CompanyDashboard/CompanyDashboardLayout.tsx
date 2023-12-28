import { Link, Typography } from "@/components/base";
import {
  WindowNavigation,
  WindowNavigationLink,
} from "@/components/base/WindowNavigation/WindowNavigation";
import { CompanyPageUrls } from "@/const";
import { useMyCompanyContext } from "@/context";
import { useTranslations } from "next-intl";
import { PropsWithChildren, useMemo, type FC } from "react";

export const CompanyDashboardLayout: FC<PropsWithChildren> = ({ children }) => {
  const t = useTranslations("layout.company-dashboard");
  const { name, slogan } = useMyCompanyContext();

  const navigationLinks = useMemo<WindowNavigationLink[]>(
    () => [
      { title: t("navigation.statistic"), href: CompanyPageUrls.home },
      { title: t("navigation.users"), href: CompanyPageUrls.users },
    ],
    [t]
  );

  return (
    <div className="grid grid-cols-1 gap-3">
      <div className="grid grid-cols-1 gap-3">
        <div className="flex items-center justify-between">
          <div className="grid grid-cols-1 gap-1">
            <Typography tag="p" styling="2xl">
              {name}
            </Typography>
            {slogan && (
              <Typography tag="p" styling="sm" className="italic">
                {slogan}
              </Typography>
            )}
          </div>
          <Link to={CompanyPageUrls.profile} size="sm">
            {t("profile")}
          </Link>
        </div>
        <WindowNavigation
          title={t("navigation.title")}
          items={navigationLinks}
        />
      </div>
      <main>{children}</main>
    </div>
  );
};
