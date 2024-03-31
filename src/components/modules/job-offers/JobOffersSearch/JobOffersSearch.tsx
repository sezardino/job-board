import { Icon } from "@/components/base/Icon/Icon";
import { Input } from "@nextui-org/react";

type Props = {};

export type JobOffersSearchProps = Props & {};

export const JobOffersSearch = () => {
  return (
    <Input
      isClearable
      placeholder="Search..."
      radius="full"
      size="md"
      labelPlacement="outside"
      startContent={
        <Icon name="HiSearch" className="text-zinc-500" size={24} />
      }
    />
  );
};
