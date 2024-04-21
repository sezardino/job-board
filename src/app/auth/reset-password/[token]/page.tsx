"use client";

type Props = {
  params: {
    token: string;
  };
};

const ResetPasswordPage = (props: Props) => {
  const { token } = props.params;

  return <div>ResetPasswordPage - {token}</div>;
};

export default ResetPasswordPage;
