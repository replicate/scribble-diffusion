import "../styles/globals.css";
import { Analytics } from "@vercel/analytics/react";
import { Tooltip } from "react-tooltip";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Tooltip id="replicate-tooltip" />
      <Tooltip id="vercel-tooltip" />
      <Tooltip id="bytescale-tooltip" />
      <Tooltip id="github-tooltip" />
      <Tooltip id="youtube-tooltip" />
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}

export default MyApp;
