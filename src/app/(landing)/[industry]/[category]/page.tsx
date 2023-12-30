type Props = {
  params: {
    industry: string;
    category: string;
  };
};

const IndustryPage = (props: Props) => {
  return <h1>{JSON.stringify(props.params)}</h1>;
};

export default IndustryPage;
