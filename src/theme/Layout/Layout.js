// src/theme/Layout/Layout.js

import React from "react";
import Layout from "@theme/Layout";
import clsx from "clsx";
import styles from "./styles.module.css";

function CustomLayout(props) {
  return (
    <Layout {...props}>
      <div className={clsx("sidebar", styles.sidebar)}>
        {/* WIP, does not work yet */}
      </div>
      <main className={clsx("main-wrapper", styles.mainContent)}>
        {props.children}
      </main>
    </Layout>
  );
}

export default CustomLayout;
