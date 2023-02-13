import Head from "next/head";
import Link from "next/link";
import { ArrowLeft as ArrowLeftIcon } from "lucide-react";

import appName from "./index";

export default function About() {
  return (
    <div>
      <Head>
        <title>{appName}</title>
      </Head>

      <main className="container max-w-[600px] mx-auto p-5">
        <h1 className="text-center text-5xl font-bold m-6">{appName}</h1>

        <p className="prose">
          This open-source website provides a simple interface for modifying
          images using text-based instructions. You can upload an image, provide
          a text prompt describing how to change that image, and generate new
          images based on the prompt.
        </p>

        <p className="prose">
          The image generation is powered by{" "}
          <Link href="https://www.timothybrooks.com/instruct-pix2pix/">
            InstructPix2Pix
          </Link>
          , an open-source machine learning model that combines the knowledge
          from <Link href="https://openai.com/api/">GPT-3</Link> and{" "}
          <Link href="https://replicate.com/stability-ai/stable-diffusion?utm_source=project&utm_campaign=scribblediffusion">
            Stable Diffusion
          </Link>{" "}
          to generate a large dataset of image editing examples. This model was
          created at the University of California, Berkeley by{" "}
          <Link href="https://timothybrooks.com/about">Tim Brooks</Link>,{" "}
          <Link href="http://www.holynski.org/">Aleksander Holynski</Link>, and{" "}
          <Link href="https://people.eecs.berkeley.edu/~efros/">
            Alexei A. Efros
          </Link>
          .
        </p>

        <p className="prose">
          The model is hosted on{" "}
          <Link href="https://replicate.com/timothybrooks/instruct-pix2pix?utm_source=project&utm_campaign=scribblediffusion">
            Replicate
          </Link>
          , which exposes a cloud API for running predictions. This website is
          built with Next.js and hosted on
          <Link href="https://vercel.com/templates/ai">Vercel</Link>, and uses
          Replicate&apos;s API to run the InstructPix2Pix model. The source code
          is publicly available on{" "}
          <Link href="https://github.com/replicate/instruct-pix2pix-demo">
            GitHub
          </Link>
          . Pull requests welcome!
        </p>

        <div className="text-center mt-10">
          <Link href="/">
            <a className="bg-black text-white rounded-md text-small inline-block p-3 flex-none">
              <ArrowLeftIcon className="icon" />
              Back to painting
            </a>
          </Link>
        </div>
      </main>
    </div>
  );
}
