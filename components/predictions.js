import { Fragment, useRef, useEffect } from "react";
import Image from "next/image";
import PulseLoader from "react-spinners/PulseLoader";

export default function Predictions({ predictions, submissionCount }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (submissionCount > 0) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [predictions, submissionCount]);

  if (submissionCount === 0) return;

  return (
    <section className="w-full my-10">
      <h2 className="text-center text-3xl font-bold m-6">Results</h2>

      {submissionCount > Object.keys(predictions).length && (
        <div className="pb-10 mx-auto w-full text-center">
          <div className="pt-10" ref={scrollRef} />
          <PulseLoader />
        </div>
      )}

      {Object.values(predictions)
        .slice()
        .reverse()
        .map((prediction, index) => (
          <Fragment key={prediction.id}>
            {index === 0 &&
              submissionCount == Object.keys(predictions).length && (
                <div ref={scrollRef} />
              )}
            <Prediction prediction={prediction} />
          </Fragment>
        ))}
    </section>
  );
}

function Prediction({ prediction }) {
  return (
    <div className="shadow-lg border my-10 p-5 bg-white">
      <div className="flex">
        <div className="w-1/2 aspect-square relative">
          <Image src={prediction.input.image} alt="input scribble" fill />
        </div>
        <div className="w-1/2 aspect-square relative">
          {prediction.output?.length ? (
            <Image
              src={prediction.output[prediction.output.length - 1]}
              alt="output image"
              fill
            />
          ) : (
            <div className="grid h-full place-items-center">
              <PulseLoader />
            </div>
          )}
        </div>
      </div>
      <div className="text-center pt-4 opacity-80">
        {prediction.input.prompt}
      </div>
    </div>
  );
}
