import { UserInfo } from "@/components/UI/UserInfo/UserInfo";
import { Grid, Typography } from "@/components/base";
import { BaseAvatar } from "@/components/base/Avatar/BaseAvatar";
import { FileEntity } from "@/types";
import { AvatarGroup } from "@nextui-org/react";
import parse from "html-react-parser";
import { type ComponentPropsWithoutRef, type FC } from "react";
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

  return (
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
        users
        <Grid>
          <Typography tag="p">owner</Typography>
          <UserInfo
            name={company?.owner.name}
            avatar={company?.owner.avatar?.url}
          />
        </Grid>
        <Grid>
          <Typography tag="p">members</Typography>

          <AvatarGroup as="ul" max={3} className="justify-self-start ml-2">
            {company?.members?.map((member) => (
              <li key={member.id}>
                <BaseAvatar src={member.avatar?.url} alt={member.name} />
              </li>
            ))}
          </AvatarGroup>
        </Grid>
      </Grid>

      <Grid>gallery</Grid>
      <div>
        main
        {company?.bio && <div>{parse(company.bio)}</div>}
      </div>
    </section>
  );
};
