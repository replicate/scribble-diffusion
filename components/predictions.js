import { Fragment } from "react";
import Image from "next/image";
import PulseLoader from "react-spinners/PulseLoader";

function Prediction ({prediction}) {
  console.log("render prediction", prediction)
  return (
    <div className="shadow-lg border my-10 p-5">
    <div className="flex">
      <div className="w-1/2 aspect-square relative">
      <Image
        src={prediction.input.image}
        alt="input scribble"
        fill
      />
      </div>
      <div className="w-1/2 aspect-square relative">
        {prediction.output?.length ? (      <Image
        src={prediction.output[prediction.output.length - 1]}
        alt="output image"
        fill
      />) : (<PulseLoader />)}

      </div>
    </div>
    <div className="text-center pt-4 opacity-80">{prediction.input.prompt}</div>
    </div>
  )
}

export default function Predictions({ predictions }) {

  if (Object.keys(predictions).length === 0)
    return

  return (
    <section className="w-full my-10">
      <h2 className="text-center text-3xl font-bold m-6">Results</h2>

      {Object.values(predictions).slice().reverse().map((prediction) => (
        <Fragment key={prediction.id}>
          <Prediction prediction={prediction} />
        </Fragment>
      ))}
    </section>
  );
}
