import { ImageGallery } from "@/components/UI/ImageGallery/ImageGallery";
import { UserInfo } from "@/components/UI/UserInfo/UserInfo";
import { Button, Grid, Modal, Typography } from "@/components/base";
import { BaseAvatar } from "@/components/base/Avatar/BaseAvatar";
import { EditCompanyBioForm } from "@/components/forms/EditCompanyBio/EditCompanyBioForm";
import { FileEntity } from "@/types";
import { AvatarGroup } from "@nextui-org/react";
import parse from "html-react-parser";
import { useTranslations } from "next-intl";
import { useState, type ComponentPropsWithoutRef, type FC } from "react";
import { twMerge } from "tailwind-merge";

export type CompanyTemplateEntity = {
  name: string;
  catchPhrase: string | null;
  members: { id: string; name: string; avatar: FileEntity | null }[];
  owner: { id: string; name: string; avatar: FileEntity | null };
  bio: string | null;
  gallery: FileEntity[];
  thumbnail: FileEntity | null;
  _count: {
    members: number;
    offers: number;
  };
};

type Props = {
  isLoading: boolean;
  company?: CompanyTemplateEntity;
  withManage?: boolean;
};

export type CompanyTemplateProps = ComponentPropsWithoutRef<"section"> & Props;

export const CompanyTemplate: FC<CompanyTemplateProps> = (props) => {
  const { company, isLoading, className, ...rest } = props;
  const t = useTranslations("components.company-template");
  const [isEditBioModalOpen, setIsEditBioModalOpen] = useState(false);

  return (
    <>
      <section {...rest} className={twMerge(className)}>
        <Grid tag="header" gap={3}>
          head
          <Grid gap={2}>
            <Grid gap={1}>
              <Typography tag="h1" styling="2xl">
                {company?.name}
              </Typography>
              {company?.catchPhrase && (
                <Typography tag="p" styling="sm" className="italic">
                  {company.name}
                </Typography>
              )}
            </Grid>
          </Grid>
          <div className="-order-1 aspect-thumbnail bg-black w-full"></div>
        </Grid>

        <Grid>
          <Typography tag="h2">{t("users")}</Typography>

          <Grid>
            <Typography tag="h3">{t("owner")}</Typography>
            <UserInfo
              name={company?.owner.name}
              avatar={company?.owner.avatar?.url}
            />
          </Grid>
          <Grid>
            <Typography tag="h3">{t("members")}</Typography>

            <AvatarGroup as="ul" max={3} className="justify-self-start ml-2">
              {company?.members?.map((member) => (
                <li key={member.id}>
                  <BaseAvatar src={member.avatar?.url} alt={member.name} />
                </li>
              ))}
            </AvatarGroup>
          </Grid>
        </Grid>

        {!!company?.gallery.length && (
          <Grid>
            <Typography tag="h2">{t("gallery")}</Typography>
            <ImageGallery images={company?.gallery} seeMoreText="See more" />
          </Grid>
        )}

        <div className="grid grid-cols-[1fr,320px]">
          <div>
            <Typography tag="h2">{t("bio")}</Typography>
            <Button onClick={() => setIsEditBioModalOpen(true)}>
              {t("edit-bio.trigger")}
            </Button>
            {company?.bio && <div>{parse(company.bio)}</div>}
          </div>
          <div>
            <Typography tag="h2">{t("offers")}</Typography>
          </div>
        </div>
      </section>

      <Modal
        isOpen={isEditBioModalOpen}
        onClose={() => setIsEditBioModalOpen(false)}
        title={t("edit-bio.title")}
        description={t("edit-bio.description")}
        size="xl"
      >
        <EditCompanyBioForm
          onFormSubmit={(values) => console.log(values)}
          initialValues={{ bio: company?.bio || "" }}
          cancel={{
            label: t("edit-bio.cancel"),
            onClick: () => setIsEditBioModalOpen(false),
          }}
          submitText={t("edit-bio.submit")}
        />
      </Modal>
    </>
  );
};
