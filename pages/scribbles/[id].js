import { Prediction } from "components/predictions";
import Head from "next/head";
import pkg from "../../package.json";

const HOST =
  process.env.NODE_ENV === "production"
    ? "https://scribblediffusion.com"
    : "http://localhost:3000";

export default function Scribble({ prediction }) {
  return (
    <div>
      <Head>
        <title>
          {prediction && `${prediction.input.prompt} - `}
          {pkg.appName}
        </title>
        <meta
          property="og:image"
          content={`${HOST}/api/og?id=${prediction.id}`}
        />
      </Head>
      <main className="container max-w-[1024px] mx-auto p-5">
        <Prediction prediction={prediction} showLinkToNewScribble={true} />
      </main>
    </div>
  );
}

// Use getServerSideProps to force Next.js to render the page on the server,
// so the OpenGraph meta tags will have the proper URL at render time.
export async function getServerSideProps({ req }) {
  // Hack to get the protocol and host from headers:
  // https://github.com/vercel/next.js/discussions/44527
  const protocol = req.headers.referer?.split("://")[0] || "http";
  const predictionId = req.url.split("/")[2];
  const response = await fetch(
    `${protocol}://${req.headers.host}/api/predictions/${predictionId}`
  );
  const prediction = await response.json();
  return { props: { prediction } };
}
