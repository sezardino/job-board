import { Typography } from "@/components/base";
import { LightBox } from "@/components/base/Lightbox/Lightbox";
import { FileEntity } from "@/types";
import { Card } from "@nextui-org/react";
import Image from "next/image";
import {
  useMemo,
  useState,
  type ComponentPropsWithoutRef,
  type FC,
} from "react";
import { twMerge } from "tailwind-merge";
import { SlideImage } from "yet-another-react-lightbox";

type Props = {
  images: FileEntity[];
  max?: number;
  withLightBox?: boolean;
  seeMoreText?: string;
};

export type ImageGalleryProps = ComponentPropsWithoutRef<"ul"> & Props;

export const ImageGallery: FC<ImageGalleryProps> = (props) => {
  const {
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
    console.log({ firstSlides, lastSlides, maxIndex, firstSlideId });

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

  return (
    <>
      <ul {...rest} className={twMerge("flex gap-2 flex-wrap", className)}>
        {slicedImages.map((image) => (
          <Card
            as="li"
            key={image.id}
            isPressable={withLightBox}
            className="w-40 h-40"
            onClick={() => openModal(image.id)}
          >
            <Image src={image.url} fill alt={image.name} />
          </Card>
        ))}
        {images.length > max && (
          <Card
            as="li"
            isBlurred
            isPressable={withLightBox}
            className="w-40 h-40 flex justify-center items-center text-center"
            onClick={() => openModal()}
          >
            <Typography tag="p" styling="sm">
              {`+${images.length - max}`}
            </Typography>
            {seeMoreText && (
              <Typography tag="p" styling="sm">
                {seeMoreText}
              </Typography>
            )}
          </Card>
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
