import React, { useState } from "react";
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
  const [loading, setloading] = useState(true);

  React.useEffect(() => {
    const viewer = new XMindEmbedViewer({
      el: "#xmind-wrapper", // HTMLElement | HTMLIFrameElement | string
      styles: {
        height: "calc(100vh - 100px)",
        width: "100%",
      },
    });
    viewer.setZoomScale(120);

    fetch("xmind/李幸娟-前端汇总.xmind")
      .then((res) => res.arrayBuffer())
      .then((file) => viewer.load(file))
      .finally(() => {
        setloading(false);
      });
  }, []);

  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      {loading && <h1 style={{ position: "absolute", top: "45vh", left: "45vw" }}>loading</h1>}
      <div id="xmind-wrapper" className={styles["x-mind-wrapper"]}></div>
    </Layout>
  );
}
