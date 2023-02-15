import Link from "next/link";

export default function Footer({ events }) {
  return (
    <footer className="w-full my-8">
      <div className="text-center lil-text mt-8">
        <div className="inline-block py-2 px-4 border border-yellow-200 rounded-lg bg-[#fef6aa]">
          🤔 Are you a developer and want to learn how to build this? Check out
          the{" "}
          <Link
            href="https://github.com/replicate/scribble-diffusion#readme"
            target="_blank"
          >
            README
          </Link>
          .
        </div>
      </div>

      <div className="text-center lil-text mt-8">
        Powered by{" "}
        <Link
          href="https://replicate.com/jagilley/controlnet-scribble?utm_source=project&utm_campaign=scribblediffusion"
          target="_blank"
        >
          ControlNet
        </Link>
        ,{" "}
        <Link
          href="https://replicate.com/jagilley/controlnet-scribble?utm_source=project&utm_campaign=scribblediffusion"
          target="_blank"
        >
          Replicate
        </Link>
        ,{" "}
        <Link href="https://vercel.com/templates/ai" target="_blank">
          Vercel
        </Link>
        , and{" "}
        <Link
          href="https://github.com/replicate/scribble-diffusion"
          target="_blank"
        >
          GitHub
        </Link>
      </div>
    </footer>
  );
}
