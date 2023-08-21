import Link from "next/link";
import Image from "next/image";
// import "react-tooltip/dist/react-tooltip.css";

const linkStyles =
  "inline-block relative w-12 h-12 mx-2 opacity-40 hover:opacity-100 transition-all duration-200";
const imageStyles =
  "p-3 hover:p-1  transition-all duration-200  hover:saturate-100";

export default function Footer() {
  return (
    <footer className="mt-20">
      <div className="">
        <p className="text-center">
          Scribble Diffusion is an open-source project from{" "}
          <Link
            className="underline"
            href="https://replicate.com?utm_source=project&utm_campaign=scribblediffusion"
            target="_blank"
          >
            Replicate
          </Link>
          .
        </p>

        <nav className="text-center mt-16">
          <Link
            className={linkStyles}
            href="https://replicate.com?utm_source=project&utm_campaign=scribblediffusion"
          >
            <Image
              src="/logomarks/replicate.svg"
              alt="Replicate"
              data-tooltip-id="replicate-tooltip"
              data-tooltip-content="Built by Replicate"
              className={imageStyles}
              fill={true}
              unoptimized={true}
            />
          </Link>
          <Link
            className={linkStyles}
            href="https://www.bytescale.com/?utm_source=project&utm_campaign=scribblediffusion"
          >
            <Image
              src="/logomarks/bytescale.svg"
              data-tooltip-id="bytescale-tooltip"
              data-tooltip-content="File storage from Bytescale"
              alt="File storage from Bytescale"
              className={imageStyles}
              fill={true}
              unoptimized={true}
            />
          </Link>
          <Link className={linkStyles} href="https://vercel.com/templates/ai">
            <Image
              src="/logomarks/vercel.svg"
              data-tooltip-id="vercel-tooltip"
              data-tooltip-content="Hosted on Vercel"
              alt="Vercel"
              className={imageStyles}
              fill={true}
              unoptimized={true}
            />
          </Link>

          <Link className={linkStyles} href="https://youtu.be/6z07OdbrWOs">
            <Image
              src="/logomarks/youtube.svg"
              data-tooltip-id="youtube-tooltip"
              data-tooltip-content="See how it was made"
              alt="See how it was made"
              className={imageStyles}
              fill={true}
              unoptimized={true}
            />
          </Link>
          <Link
            className={linkStyles}
            href="https://github.com/replicate/scribble-diffusion"
          >
            <Image
              src="/logomarks/github.svg"
              data-tooltip-id="github-tooltip"
              data-tooltip-content="Fork it on GitHub"
              alt="Fork it on GitHub"
              className={imageStyles}
              fill={true}
              unoptimized={true}
            />
          </Link>
        </nav>
      </div>
    </footer>
  );
}
