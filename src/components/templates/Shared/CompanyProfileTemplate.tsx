import { ImageGallery } from "@/components/UI/ImageGallery/ImageGallery";
import {
  OfferCardEntity,
  OffersList,
} from "@/components/UI/OffersList/OffersList";
import {
  Button,
  Grid,
  LoadingOverlay,
  Modal,
  Typography,
} from "@/components/base";
import { BaseAvatar } from "@/components/base/Avatar/BaseAvatar";
import {
  EditCompanyBaseDataForm,
  EditCompanyBaseDataFormValues,
} from "@/components/forms/EditCompanyBaseData/EditCompanyBaseDataForm";
import {
  EditCompanyBioForm,
  EditCompanyBioFormValues,
} from "@/components/forms/EditCompanyBio/EditCompanyBioForm";
import {
  ImagesForm,
  ImagesFormValues,
} from "@/components/forms/Images/ImagesForm";
import {
  EditCompanyRequest,
  EditCompanyResponse,
} from "@/services/server/modules/companies/schema";
import { ActionProp, FileEntity } from "@/types";
import parse from "html-react-parser";
import { useTranslations } from "next-intl";
import { useState, type ComponentPropsWithoutRef, type FC } from "react";
import { twMerge } from "tailwind-merge";

export type CompanyProfileTemplateEntity = {
  name: string;
  catchPhrase: string | null;
  bio: string | null;
  logo: FileEntity | null;
  gallery: FileEntity[];
  thumbnail: FileEntity | null;
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
    withManage,
    editAction,
    className,
    ...rest
  } = props;
  const t = useTranslations("components.company-template");
  const [isEditBioModalOpen, setIsEditBioModalOpen] = useState(false);
  const [isEditBaseDataModalOpen, setIsEditBaseDataModalOpen] = useState(false);
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);

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
        logoDeleted: values.isLogoDeleted,
        slogan: values.slogan,
      });

      setIsEditBaseDataModalOpen(false);
    } catch (error) {}
  };

  const editGalleryHandler = async (values: ImagesFormValues) => {
    if (!withManage || !editAction) return;

    try {
      await editAction.handler({
        gallery: values.images,
        galleryDeleted: values.imagesToDelete,
      });

      setIsGalleryModalOpen(false);
    } catch (error) {}
  };

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

        {(!!company?.gallery.length || withManage) && (
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
        )}

        <Grid gap={2}>
          <div className="flex justify-between items-center gap-3 flex-wrap">
            <Typography tag="h2" weight="medium" styling="lg">
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
        </Grid>

        <Grid gap={2}>
          <Typography tag="h2" weight="medium" styling="lg">
            {t("offers.title")}
          </Typography>
          <OffersList
            offers={company?.offers || []}
            linkPrefix={offerLinkPrefix}
            endContent={
              company && company.offers.length < company._count.offers
                ? [{ label: t("offers.more"), to: offerLinkPrefix }]
                : undefined
            }
          />
        </Grid>
      </Grid>

      {withManage && (
        <>
          {editAction && (
            <>
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

              <Modal
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
              </Modal>
            </>
          )}
        </>
      )}
    </>
  );
};
