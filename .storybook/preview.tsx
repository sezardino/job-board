import type { Preview } from "@storybook/react";
import { NextIntlClientProvider } from "next-intl";
import React from "react";

import "../src/styles/index.css";

const preview: Preview = {
  decorators: [
    (Story) => (
      <NextIntlClientProvider
        timeZone="Europe/Warsaw"
        locale={"en"}
        messages={{}}
      >
        <Story />
      </NextIntlClientProvider>
    ),
  ],
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
