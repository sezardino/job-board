import { Button, Grid, Icon, Link, Typography } from "@/components/base";
import { PublicPageUrls } from "@/const";
import {
  Popover,
  PopoverContent,
  PopoverProps,
  PopoverTrigger,
} from "@nextui-org/react";
import { useTranslations } from "next-intl";

import NextLink from "next/link";
import { type FC } from "react";

type Props = {
  text?: string;
  buttonType?: "button" | "link";
};

type OmittedProps = Omit<PopoverProps, "children">;

export type SignUpPopoverProps = OmittedProps & Props;

export const SignUpPopover: FC<SignUpPopoverProps> = (props) => {
  const { text, buttonType = "button", className, ...rest } = props;
  const t = useTranslations("components.sign-up-popover");

  const trigger =
    buttonType === "link" ? (
      <Link color="primary" size="sm">
        {t("trigger")}
      </Link>
    ) : (
      <Button variant="bordered" color="primary">
        {t("trigger")}
      </Button>
    );

  return (
    <Popover placement="bottom" offset={10} {...rest} backdrop="blur">
      <Typography tag="p" className="text-center">
        {text && <>{text} </>}
        <PopoverTrigger>{trigger}</PopoverTrigger>
      </Typography>
      <PopoverContent className="w-[240px]">
        {(titleProps) => (
          <Grid gap={4} className="px-1 py-2 w-full">
            <Typography
              tag="h3"
              weight="medium"
              styling="md"
              className="text-center"
              {...titleProps}
            >
              {t("title")}
            </Typography>
            <Grid tag="ul" gap={2} className="list-none">
              <li>
                <Button
                  as={NextLink}
                  href={PublicPageUrls.registerUser}
                  className="w-full"
                  color="primary"
                  variant="bordered"
                  startContent={<Icon name="HiUser" />}
                >
                  {t("customer")}
                </Button>
              </li>
              <li>
                <Button
                  as={NextLink}
                  href={PublicPageUrls.registerCompany}
                  className="w-full"
                  variant="bordered"
                  color="primary"
                  startContent={<Icon name="HiBuildingOffice" />}
                >
                  {t("company")}
                </Button>
              </li>
            </Grid>
          </Grid>
        )}
      </PopoverContent>
    </Popover>
  );
};
