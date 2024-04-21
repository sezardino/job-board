import { PropsWithChildren } from "react";

import styles from "./AuthLayout.module.scss";

// import BrandLogo from "@/assets/brand/logo-big.png";

export const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <main className={styles.element}>
      {/* <Image src={BrandLogo} alt="Wish List logo" className="mx-auto mb-5" /> */}
      {children}
    </main>
  );
};
