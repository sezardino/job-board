type Props = {
  params: {
    industry: string;
  };
};

const IndustryPage = (props: Props) => {
  return <h1>{props.params.industry}</h1>;
};

export default IndustryPage;
