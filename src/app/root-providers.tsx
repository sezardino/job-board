"use client";

import { ProfileProvider } from "@/context";
import { NextUIProvider } from "@nextui-org/react";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { NextIntlClientProvider } from "next-intl";
import { PropsWithChildren } from "react";
import { ToastContainer } from "react-toastify";
import { ReactQueryProvider } from "../libs/react-query/config";

export type RootLayoutProvidersProps = PropsWithChildren<{
  session: Session | null;
  locale: string;
  messages: any;
}>;

export const RootLayoutProviders = (props: RootLayoutProvidersProps) => {
  const { children, session, locale, messages } = props;

  return (
    <SessionProvider session={session}>
      <NextIntlClientProvider
        timeZone="Europe/Warsaw"
        locale={locale}
        messages={messages}
      >
        <ReactQueryProvider>
          <NextUIProvider>
            <ProfileProvider>{children}</ProfileProvider>
            <ToastContainer />
          </NextUIProvider>
        </ReactQueryProvider>
      </NextIntlClientProvider>
    </SessionProvider>
  );
};
