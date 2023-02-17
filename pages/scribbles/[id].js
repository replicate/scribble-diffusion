import Error from "components/error";
import { Prediction } from "components/predictions";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import pkg from "../../package.json";

export default function Scribble() {
  const { query } = useRouter();

  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);
  const [queryResolved, setQueryResolved] = useState(false);

  useEffect(() => {
    // Hack to work around some Next.js quirks
    // "Pages that are statically optimized by Automatic Static Optimization
    // will be hydrated without their route parameters provided, i.e query
    // will be an empty object ({})."
    if (query?.id && !queryResolved) {
      // Next.js seems to sometimes call this hook multiple times, so we need
      // to make sure we only fetch the prediction once
      setQueryResolved(true);

      const fetchPrediction = async () => {
        const response = await fetch(`/api/predictions/${query.id}`);
        const prediction = await response.json();
        setPrediction(prediction);

        if (response.status !== 201) {
          setError(prediction.detail);
        }
      };

      fetchPrediction();
    }
  }, [query, queryResolved]);

  return (
    <div>
      <Head>
        <title>
          {prediction && `${prediction.input.prompt} - `}
          {pkg.appName}
        </title>
      </Head>
      <main className="container max-w-[1024px] mx-auto p-5">
        <Prediction prediction={prediction} showLinkToNewScribble={true} />
        <Error error={error} />
      </main>
    </div>
  );
}
