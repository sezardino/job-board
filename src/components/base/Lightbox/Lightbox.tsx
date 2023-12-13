import Image from "next/image";
import { FC, ReactNode } from "react";
import Lightbox, {
  RenderSlideProps,
  SlideImage,
  isImageFitCover,
  isImageSlide,
  useLightboxProps,
} from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";

import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/styles.css";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  slides: SlideImage[];
};

export type LightBoxProps = Props;

export const LightBox: FC<LightBoxProps> = (props) => {
  const { isOpen, onClose, ...rest } = props;

  return (
    <Lightbox
      {...rest}
      open={isOpen}
      plugins={[Thumbnails]}
      close={onClose}
      render={{ slide: RenderSlideFunction }}
    />
  );
};

function isNextJsImage(slide: SlideImage) {
  return (
    isImageSlide(slide) &&
    typeof slide.width === "number" &&
    typeof slide.height === "number"
  );
}

type SlideFunction = (props: RenderSlideProps<SlideImage>) => ReactNode;

const RenderSlideFunction: SlideFunction = ({ slide, rect }) => {
  const { imageFit } = useLightboxProps().carousel;
  const cover = isImageSlide(slide) && isImageFitCover(slide, imageFit);

  if (!isNextJsImage(slide)) return undefined;

  const width = !cover
    ? Math.round(
        Math.min(rect.width, (rect.height / slide.height!) * slide.width!)
      )
    : rect.width;

  const height = !cover
    ? Math.round(
        Math.min(rect.height, (rect.width / slide.width!) * slide.height!)
      )
    : rect.height;

  return (
    <div style={{ position: "relative", width, height }}>
      <Image
        fill
        alt=""
        src={slide.src}
        loading="eager"
        draggable={false}
        style={{ objectFit: cover ? "cover" : "contain" }}
        sizes={`${Math.ceil((width / window.innerWidth) * 100)}vw`}
      />
    </div>
  );
};
