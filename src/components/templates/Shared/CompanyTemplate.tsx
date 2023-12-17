import { ImageGallery } from "@/components/UI/ImageGallery/ImageGallery";
import {
  Button,
  Grid,
  LoadingOverlay,
  Modal,
  Typography,
} from "@/components/base";
import {
  EditCompanyBaseDataForm,
  EditCompanyBaseDataFormValues,
} from "@/components/forms/EditCompanyBaseData/EditCompanyBaseDataForm";
import {
  EditCompanyBioForm,
  EditCompanyBioFormValues,
} from "@/components/forms/EditCompanyBio/EditCompanyBioForm";
import {
  EditCompanyRequest,
  EditCompanyResponse,
} from "@/services/server/modules/companies/schema";
import { ActionProp, FileEntity } from "@/types";
import { Seniority } from "@prisma/client";
import parse from "html-react-parser";
import { useTranslations } from "next-intl";
import { useState, type ComponentPropsWithoutRef, type FC } from "react";
import { twMerge } from "tailwind-merge";

export type CompanyTemplateEntity = {
  name: string;
  catchPhrase: string | null;
  bio: string | null;
  logo: FileEntity | null;
  gallery: FileEntity[];
  thumbnail: FileEntity | null;
  offers: {
    id: string;
    name: string;
    level: Seniority;
    salary: {
      from: number;
      to: number;
      currency: string;
    };
  }[];
  _count: {
    members: number;
    offers: number;
  };
};

type Props = {
  isLoading: boolean;
  company?: CompanyTemplateEntity;
  withManage?: boolean;
  editAction?: ActionProp<EditCompanyRequest, EditCompanyResponse>;
};

export type CompanyTemplateProps = ComponentPropsWithoutRef<"section"> & Props;

export const CompanyTemplate: FC<CompanyTemplateProps> = (props) => {
  const { company, isLoading, withManage, editAction, className, ...rest } =
    props;
  const t = useTranslations("components.company-template");
  const [isEditBioModalOpen, setIsEditBioModalOpen] = useState(false);
  const [isEditBaseDataModalOpen, setIsEditBaseDataModalOpen] = useState(false);

  const editBioHandler = async (values: EditCompanyBioFormValues) => {
    if (!withManage || !editAction) return;

    try {
      await editAction.handler({ bio: values.bio });

      setIsEditBioModalOpen(false);
    } catch (error) {}
  };

  const editBaseCompanyDataHandler = async (
    values: EditCompanyBaseDataFormValues
  ) => {
    if (!withManage || !editAction) return;

    try {
      await editAction.handler(values);

      setIsEditBaseDataModalOpen(false);
    } catch (error) {}
  };

  return (
    <>
      <Grid {...rest} tag="section" gap={3} className={twMerge(className)}>
        <Grid tag="header" gap={3}>
          <Grid gap={2}>
            <Grid gap={1}>
              <div className="flex justify-between items-center gap-3 flex-wrap">
                <Typography tag="h1" styling="2xl">
                  {company?.name}
                </Typography>

                <Button
                  variant="light"
                  size="sm"
                  color="primary"
                  onClick={() => setIsEditBaseDataModalOpen(true)}
                >
                  {t("edit-base-data.trigger")}
                </Button>
              </div>
              {company?.catchPhrase && (
                <Typography tag="p" styling="sm" className="italic">
                  {company.catchPhrase}
                </Typography>
              )}
            </Grid>
          </Grid>
          <div className="-order-1 aspect-thumbnail bg-black w-full"></div>
        </Grid>

        {!!company?.gallery.length && (
          <Grid>
            <Typography tag="h2">{t("gallery")}</Typography>
            <ImageGallery images={company?.gallery} seeMoreText="See more" />
          </Grid>
        )}

        <div className="grid gap-3 grid-cols-[1fr,320px]">
          <div>
            <div className="flex justify-between items-center gap-3 flex-wrap">
              <Typography tag="h2" weight="bold" styling="lg">
                {t("bio")}
              </Typography>
              <Button
                variant="light"
                size="sm"
                color="primary"
                onClick={() => setIsEditBioModalOpen(true)}
              >
                {t("edit-bio.trigger")}
              </Button>
            </div>
            {company?.bio ? (
              <div>{parse(company.bio)}</div>
            ) : (
              <Typography tag="p" weight="thin" className="italic ">
                {t("no-bio")}
              </Typography>
            )}
          </div>
          <div>
            <Typography tag="h2">{t("offers")}</Typography>
          </div>
        </div>
      </Grid>

      {withManage && (
        <>
          {editAction && (
            <Modal
              isOpen={isEditBioModalOpen}
              onClose={() => setIsEditBioModalOpen(false)}
              title={t("edit-bio.title")}
              description={t("edit-bio.description")}
              size="xl"
            >
              {editAction.isLoading && <LoadingOverlay isInWrapper />}
              <EditCompanyBioForm
                onFormSubmit={editBioHandler}
                initialValues={{ bio: company?.bio || "" }}
                cancel={{
                  label: t("edit-bio.cancel"),
                  onClick: () => setIsEditBioModalOpen(false),
                }}
                submitText={t("edit-bio.submit")}
              />
            </Modal>
          )}
          {editAction && (
            <Modal
              isOpen={isEditBaseDataModalOpen}
              onClose={() => setIsEditBaseDataModalOpen(false)}
              title={t("edit-base-data.title")}
              description={t("edit-base-data.description")}
              size="xl"
            >
              {editAction.isLoading && <LoadingOverlay isInWrapper />}
              <EditCompanyBaseDataForm
                initialValues={{
                  slogan: company?.catchPhrase || "",
                  logo: company?.logo?.url || null,
                  isLogoDeleted: false,
                }}
                onFormSubmit={editBaseCompanyDataHandler}
                cancel={{
                  label: t("edit-base-data.cancel"),
                  onClick: () => setIsEditBaseDataModalOpen(false),
                }}
                submitText={t("edit-base-data.submit")}
              />
            </Modal>
          )}
        </>
      )}
    </>
  );
};
