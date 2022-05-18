import React, { useState } from "react";
import { XMindEmbedViewer } from "xmind-embed-viewer";

export default function Home({ filePath }) {
  const [loading, setloading] = useState(true);

  React.useEffect(() => {
    if (!filePath) {
      return;
    }

    const viewer = new XMindEmbedViewer({
      el: "#xmind-wrapper", // HTMLElement | HTMLIFrameElement | string
      styles: {
        height: "calc(100vh - 100px)",
        width: "100%",
      },
    });
    viewer.setZoomScale(120);

    fetch(filePath)
      .then((res) => res.arrayBuffer())
      .then((file) => viewer.load(file))
      .finally(() => {
        setloading(false);
      });
  }, [filePath]);

  return (
    <>
      {loading && <h1 style={{ position: "absolute", top: "45vh", left: "45vw" }}>loading</h1>}
      <div id="xmind-wrapper" style={{ width: "100%" }}></div>
      {!filePath && "empty"}
    </>
  );
}
