import { Icon, IconNames, Typography } from "@/components/base";
import { LightBox } from "@/components/base/Lightbox/Lightbox";
import { FileEntity } from "@/types";
import {
  PropsWithChildren,
  useMemo,
  useState,
  type ComponentPropsWithoutRef,
  type FC,
} from "react";
import { twMerge } from "tailwind-merge";
import { SlideImage } from "yet-another-react-lightbox";
import { ImageCard } from "../ImageCard/ImageCard";

type Placeholder = PropsWithChildren & {
  text?: string;
  icon?: IconNames;
  onClick?: () => void;
  hidden?: boolean;
};

type Props = {
  images: FileEntity[];
  max?: number;
  withLightBox?: boolean;
  seeMoreText?: string;
  firstPlaceholders?: Placeholder[];
  lastPlaceholders?: Placeholder[];
};

export type ImageGalleryProps = ComponentPropsWithoutRef<"ul"> & Props;

export const ImageGallery: FC<ImageGalleryProps> = (props) => {
  const {
    firstPlaceholders,
    lastPlaceholders,
    withLightBox = false,
    images,
    max = 5,
    seeMoreText,
    className,
    ...rest
  } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [firstSlideId, setFirstSlideId] = useState<string | null>(null);

  const slicedImages = useMemo(() => images.slice(0, max), [images, max]);

  const convertedToLightBoxImages = useMemo<SlideImage[]>(() => {
    if (!withLightBox) return [];
    let maxIndex = max;
    const converted = images.map((i) => ({ src: i.url, alt: i.name }));

    if (firstSlideId) {
      const index = images.findIndex((i) => i.id === firstSlideId);
      maxIndex = index !== -1 ? index : max;
    }

    const firstSlides = converted.slice(0, maxIndex);
    const lastSlides = converted.slice(maxIndex);

    return [...lastSlides, ...firstSlides];
  }, [images, max, withLightBox, firstSlideId]);

  const openModal = (id?: string) => {
    if (!withLightBox) return;
    if (id) setFirstSlideId(id);

    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFirstSlideId(null);
  };

  const isLightBoxCardShowed = images.length > max && withLightBox;

  return (
    <>
      <ul {...rest} className={twMerge("flex gap-2 flex-wrap", className)}>
        {!!firstPlaceholders?.length &&
          firstPlaceholders.map((placeholder, index) => (
            <Placeholder key={index} {...placeholder} />
          ))}
        {slicedImages.map((image) => (
          <ImageCard
            as="li"
            key={image.id}
            image={image}
            isPressable={withLightBox}
            onClick={() => openModal(image.id)}
          />
        ))}
        {!!lastPlaceholders?.length &&
          lastPlaceholders.map((placeholder, index) => (
            <Placeholder key={index} {...placeholder} />
          ))}
        {isLightBoxCardShowed && (
          <Placeholder onClick={openModal}>
            <Typography tag="p" styling="sm">
              {`+${images.length - max}`}
            </Typography>
            {seeMoreText && (
              <Typography tag="p" styling="sm">
                {seeMoreText}
              </Typography>
            )}
          </Placeholder>
        )}
      </ul>

      {withLightBox && (
        <LightBox
          key={firstSlideId?.toString()}
          isOpen={isModalOpen}
          onClose={closeModal}
          slides={convertedToLightBoxImages}
        />
      )}
    </>
  );
};

const Placeholder: FC<Placeholder> = ({
  text,
  icon,
  onClick,
  hidden,
  children,
}) => {
  if (hidden) return null;

  return (
    <ImageCard as="li" isPressable={!!onClick} onClick={onClick}>
      <div className="flex flex-col items-center text-center">
        {icon && <Icon name={icon} />}
        {text && (
          <Typography tag="p" styling="sm">
            {text}
          </Typography>
        )}
        {children && children}
      </div>
    </ImageCard>
  );
};
