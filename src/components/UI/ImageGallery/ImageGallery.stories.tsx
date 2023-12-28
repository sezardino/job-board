import type { Meta, StoryObj } from "@storybook/react";

import { FileEntity } from "@/types";
import { ImageGallery as Component } from "./ImageGallery";

const meta: Meta<typeof Component> = {
  component: Component,
};

export default meta;
type Story = StoryObj<typeof Component>;

const image1 = "https://via.placeholder.com/600/d32776";
const image2 = "https://via.placeholder.com/600/771796";
const image3 = "https://via.placeholder.com/600/24f355";
const image4 = "https://via.placeholder.com/600/f66b97";
const image5 = "https://via.placeholder.com/600/56a8c2";
const image6 = "https://via.placeholder.com/600/b0f7cc";
const image7 = "https://via.placeholder.com/600/54176f";
const image8 = "https://via.placeholder.com/600/51aa97";
const image9 = "https://via.placeholder.com/600/810b14";

const images: FileEntity[] = [
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
  image8,
  image9,
].map((i) => ({ id: i, name: i, url: i }));

export const ImageGallery: Story = {
  render: () => (
    <Component images={images} withLightBox seeMoreText="See more" />
  ),
};
