"use client";

type Props = {
  params: {
    id: string;
  };
};

const CompanyPage = (props: Props) => {
  const { id } = props.params;

  return <>{id}</>;
};

export default CompanyPage;
