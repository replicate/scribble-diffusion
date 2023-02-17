import Link from "next/link";

export default function Footer({ events }) {
  return (
    <footer className="w-full my-8">
      <div className="text-center lil-text mt-8">
        <div className="inline-block py-3 px-4 border bg-gray-200 rounded-lg">
          🍿 Want to build an app like this? Check out the{" "}
          <Link href="https://youtu.be/6z07OdbrWOs" target="_blank">
            video tutorial
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
          Replicate
        </Link>
        ,{" "}
        <Link href="https://vercel.com/templates/ai" target="_blank">
          Vercel
        </Link>
        ,{" "}
        <Link href="https://upload.io" target="_blank">
          Upload
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
