import {
  OfferCardEntity,
  OffersList,
} from "@/components/UI/OffersList/OffersList";
import { BaseAvatar } from "@/components/base/Avatar/BaseAvatar";
import { Button } from "@/components/base/Button/Button";
import { Grid } from "@/components/base/Grid/Grid";
import { LoadingOverlay } from "@/components/base/LoadingOverlay/LoadingOverlay";
import { ModalWithDescription } from "@/components/base/ModalWithDescription/ModalWithDescription";
import { Typography } from "@/components/base/Typography/Typography";
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
} from "@/services/bll/modules/companies/schema";
import { ActionProp, FileEntity } from "@/types";
import parse from "html-react-parser";
import { useTranslations } from "next-intl";
import { useState, type ComponentPropsWithoutRef, type FC } from "react";
import { twMerge } from "tailwind-merge";

export type CompanyProfileTemplateEntity = {
  name: string;
  slogan: string | null;
  bio: string | null;
  logo: FileEntity | null;
  // TODO: add in next version (gallery)
  // gallery: FileEntity[];
  // TODO: add in next version (thumbnail)
  // thumbnail: FileEntity | null;
  offers: OfferCardEntity[];
  _count: {
    offers: number;
  };
};

type Props = {
  isLoading: boolean;
  company?: CompanyProfileTemplateEntity;
  offerLinkPrefix: string;
  withManage?: boolean;
  editAction?: ActionProp<EditCompanyRequest, EditCompanyResponse>;
};

export type CompanyProfileTemplateProps = ComponentPropsWithoutRef<"section"> &
  Props;

export const CompanyProfileTemplate: FC<CompanyProfileTemplateProps> = (
  props
) => {
  const {
    offerLinkPrefix,
    company,
    isLoading,
    withManage = false,
    editAction,
    className,
    ...rest
  } = props;
  const t = useTranslations("page.company.profile");
  const [isEditBioModalOpen, setIsEditBioModalOpen] = useState(false);
  const [isEditBaseDataModalOpen, setIsEditBaseDataModalOpen] = useState(false);
  // TODO: add in next version (gallery)
  // const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);

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
      await editAction.handler({
        logo: values.logo,
        slogan: values.slogan,
      });

      setIsEditBaseDataModalOpen(false);
    } catch (error) {}
  };

  // TODO: add in next version (gallery)
  // const editGalleryHandler = async (values: ImagesFormValues) => {
  //   if (!withManage || !editAction) return;

  //   try {
  //     await editAction.handler({
  //       gallery: values.images,
  //       galleryDeleted: values.imagesToDelete,
  //     });

  //     setIsGalleryModalOpen(false);
  //   } catch (error) {}
  // };

  return (
    <>
      <Grid {...rest} tag="section" gap={3} className={twMerge(className)}>
        <Grid tag="header" gap={3}>
          <Grid gap={2}>
            <Grid gap={1}>
              <div className="flex justify-between items-start gap-3 flex-wrap">
                <div className="flex items-center gap-2">
                  {company?.logo && (
                    <BaseAvatar
                      type="image"
                      size="lg"
                      src={company?.logo?.url}
                      alt={company.name}
                    />
                  )}
                  <Typography tag="h1" styling="2xl">
                    {company?.name}
                  </Typography>
                </div>

                {withManage && (
                  <Button
                    variant="light"
                    size="sm"
                    color="primary"
                    onClick={() => setIsEditBaseDataModalOpen(true)}
                    text={t("edit-base-data.trigger")}
                  />
                )}
              </div>
              {company?.slogan && (
                <Typography tag="p" styling="sm" className="italic">
                  {company.slogan}
                </Typography>
              )}
            </Grid>
          </Grid>
          {/* <div className="-order-1 aspect-thumbnail bg-black w-full"></div> */}
        </Grid>

        {/* TODO: add in next version (gallery) */}
        {/* {(!!company?.gallery.length || withManage) && (
          <Grid>
            <Typography tag="h2" weight="medium" styling="lg">
              {t("gallery")}
            </Typography>
            <ImageGallery
              withLightBox
              images={company?.gallery || []}
              seeMoreText="See more"
              firstPlaceholders={[
                {
                  text: t("edit-gallery.trigger"),
                  icon: "HiPhotograph",
                  onClick: () => setIsGalleryModalOpen(true),
                },
              ]}
            />
          </Grid>
        )} */}

        <Grid gap={2}>
          <div className="flex justify-between items-center gap-3 flex-wrap">
            <Typography tag="h2" weight="medium" styling="lg">
              {t("bio")}
            </Typography>

            {withManage && (
              <Button
                variant="light"
                size="sm"
                color="primary"
                onClick={() => setIsEditBioModalOpen(true)}
                text={t("edit-bio.trigger")}
              />
            )}
          </div>
          {company?.bio ? (
            <div>{parse(company.bio)}</div>
          ) : (
            <Typography tag="p" weight="thin" className="italic ">
              {t("no-bio")}
            </Typography>
          )}
        </Grid>

        <Grid gap={2}>
          <Typography tag="h2" weight="medium" styling="lg">
            {t("offers.title")}
          </Typography>
          <OffersList
            offers={company?.offers || []}
            linkPrefix={offerLinkPrefix}
          />
        </Grid>
      </Grid>

      {withManage && (
        <>
          {editAction && (
            <>
              <ModalWithDescription
                isOpen={isEditBioModalOpen}
                onClose={() => setIsEditBioModalOpen(false)}
                title={t("edit-bio.title")}
                description={t("edit-bio.description")}
                size="xl"
              >
                <ModalWithDescription.Body>
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
                </ModalWithDescription.Body>
              </ModalWithDescription>

              <ModalWithDescription
                isOpen={isEditBaseDataModalOpen}
                onClose={() => setIsEditBaseDataModalOpen(false)}
                title={t("edit-base-data.title")}
                description={t("edit-base-data.description")}
                size="xl"
              >
                <ModalWithDescription.Body>
                  {editAction.isLoading && <LoadingOverlay isInWrapper />}
                  <EditCompanyBaseDataForm
                    initialValues={{
                      slogan: company?.slogan || "",
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
                </ModalWithDescription.Body>
              </ModalWithDescription>

              {/* TODO: add in next version (gallery) */}
              {/* <Modal
                isOpen={isGalleryModalOpen}
                onClose={() => setIsGalleryModalOpen(false)}
                title={t("edit-gallery.title")}
                description={t("edit-gallery.description")}
                size="xl"
              >
                {editAction.isLoading && <LoadingOverlay isInWrapper />}
                <ImagesForm
                  label={t("edit-gallery.label")}
                  initialValues={{
                    images: company?.gallery || [],
                    imagesToDelete: [],
                  }}
                  onFormSubmit={editGalleryHandler}
                  cancel={{
                    label: t("edit-gallery.cancel"),
                    onClick: () => setIsGalleryModalOpen(false),
                  }}
                  submit={{ label: t("edit-gallery.submit") }}
                />
              </Modal> */}
            </>
          )}
        </>
      )}
    </>
  );
};
