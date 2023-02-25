import { Prediction } from "components/predictions";
import Head from "next/head";
import pkg from "../../package.json";
import getAppHost from "lib/get-app-host";

export default function Scribble({ prediction, appHost }) {
  return (
    <div>
      <Head>
        <title>
          {prediction && `${prediction.input.prompt} - `}
          {pkg.appName}
        </title>
        <meta name="description" content={prediction.input.prompt} />
        <meta property="og:title" content={pkg.appName} />
        <meta property="og:description" content={prediction.input.prompt} />
        <meta
          property="og:image"
          content={`${appHost}/api/og?id=${prediction.id}`}
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
  const appHost = getAppHost(req);
  const predictionId = req.url.split("/")[2];
  const response = await fetch(`${appHost}/api/predictions/${predictionId}`);
  const prediction = await response.json();
  return { props: { appHost, prediction } };
}
