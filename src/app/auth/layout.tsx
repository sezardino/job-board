import { PropsWithChildren } from "react";

// import BrandLogo from "@/assets/brand/logo-big.png";

const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <main className="min-h-screen flex flex-col justify-center container">
      {/* <Image src={BrandLogo} alt="Wish List logo" className="mx-auto mb-5" /> */}
      {children}
    </main>
  );
};

export default AuthLayout;
