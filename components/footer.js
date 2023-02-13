import {
  Code as CodeIcon,
  Download as DownloadIcon,
  Info as InfoIcon,
  XCircle as StartOverIcon,
} from "lucide-react";
import Link from "next/link";

export default function Footer({ events, startOver }) {
  return (
    <footer className="w-full my-8">
      <div className="text-center">
        <Link href="/about" className="lil-button">
            <InfoIcon className="icon" />
            What is this?
        </Link>

        {events.length > 1 && (
          <button className="lil-button" onClick={startOver}>
            <StartOverIcon className="icon" />
            Start over
          </button>
        )}

        {events.length > 2 && (
          <Link href={events.findLast((ev) => ev.image).image} className="lil-button" target="_blank" rel="noopener noreferrer">
              <DownloadIcon className="icon" />
              Download image
          </Link>
        )}

        <Link href="https://github.com/replicate/instruct-pix2pix-demo" className="lil-button" target="_blank" rel="noopener noreferrer">

            <CodeIcon className="icon" />
            Fork repo
        </Link>
      </div>

      <div className="text-center lil-text mt-8">
      <div className="inline-block py-2 px-4 border border-yellow-200 rounded-lg bg-[#fef6aa]">
      🤔 Are you a developer and want to learn how to build this? Check out the{" "}
        <Link href="https://github.com/replicate/paint-with-words#readme" target="_blank">
        README
        </Link>.
      </div>
      </div>

      <div className="text-center lil-text mt-8">
        Powered by{" "}
        <Link href="https://www.timothybrooks.com/instruct-pix2pix/" target="_blank">
          InstructPix2Pix
        </Link>
        ,{" "}
        <Link href="https://replicate.com/timothybrooks/instruct-pix2pix?utm_source=project&utm_campaign=scribblediffusion" target="_blank">
          Replicate
        </Link>
        ,{" "}
        <Link href="https://vercel.com/templates/ai" target="_blank">
          Vercel
        </Link>
        , and{" "}
        <Link href="https://github.com/replicate/instruct-pix2pix-demo" target="_blank">
          GitHub
        </Link>
      </div>
    </footer>
  );
}
