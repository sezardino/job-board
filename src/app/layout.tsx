import "@/styles/index.css";
import "react-toastify/ReactToastify.min.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { PropsWithChildren } from "react";
import { getNextAuthSession } from "../libs/next-auth";
import { i18nDefaultLanguage, localeHandler } from "../libs/next-intl";
import { RootLayoutProviders } from "./root-providers";

const inter = Inter({ subsets: ["latin"] });

// TODO: Update your metadata
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const RootLayout = async (props: PropsWithChildren) => {
  const { children } = props;

  const session = await getNextAuthSession();
  const messages = await localeHandler(i18nDefaultLanguage);

  return (
    <html lang="en">
      <body className={inter.className}>
        <RootLayoutProviders
          session={session}
          locale={i18nDefaultLanguage}
          messages={messages}
        >
          {children}
        </RootLayoutProviders>
      </body>
    </html>
  );
};

export default RootLayout;
