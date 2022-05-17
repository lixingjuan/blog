import React from "react";
// import clsx from "clsx";
// import Link from "@docusaurus/Link";
// import HomepageFeatures from "@site/src/components/HomepageFeatures";
// import Button from "@site/src/components/Button";
import Layout from "@theme/Layout";
import styles from "./index.module.css";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { XMindEmbedViewer } from "xmind-embed-viewer";

export default function Home() {
  const { siteConfig } = useDocusaurusContext();

  React.useEffect(() => {
    const viewer = new XMindEmbedViewer({
      el: "#xmind-wrapper", // HTMLElement | HTMLIFrameElement | string
      styles: {
        height: "calc(100vh - 100px)",
        width: "100%",
      },
    });

    fetch("test-1.xmind")
      .then((res) => res.arrayBuffer())
      .then((file) => viewer.load(file));
  }, []);

  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <div id="xmind-wrapper" className={styles["x-mind-wrapper"]}></div>
    </Layout>
  );
}
