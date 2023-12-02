"use client";

import { NextUIProvider } from "@nextui-org/react";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { NextIntlClientProvider } from "next-intl";
import { PropsWithChildren } from "react";
import { ToastContainer } from "react-toastify";
import { ReactQueryProvider } from "../libs/react-query";

export type RootLayoutProvidersProps = PropsWithChildren<{
  session: Session | null;
  locale: string;
  messages: any;
}>;

export const RootLayoutProviders = ({
  children,
  session,
  locale,
  messages,
}: RootLayoutProvidersProps) => {
  return (
    <SessionProvider session={session}>
      <NextIntlClientProvider
        timeZone="Europe/Warsaw"
        locale={locale}
        messages={messages}
      >
        <ReactQueryProvider>
          <NextUIProvider>
            {children}
            <ToastContainer />
          </NextUIProvider>
        </ReactQueryProvider>
      </NextIntlClientProvider>
    </SessionProvider>
  );
};
