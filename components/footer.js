// Import the Link component from the Next.js framework
import Link from "next/link";

// Define a functional component called Footer that takes an events prop
function Footer({ events }) {
  return (
    // The footer element that takes up the entire width and has a margin of 8 units
    <footer className="w-full my-8">
      {/* A container element with centered text and a margin-top of 8 units */}
      <div className="text-center lil-text mt-8">
        {/* A gray box element with a rounded border that contains text and a link */}
        <div className="inline-block py-3 px-4 border bg-gray-200 rounded-lg">
          {/* An emoji followed by text and a Link component */}
          <span role="img" aria-label="popcorn">🍿</span> Want to build an app like this? 
          <Link href="https://github.com/replicate/scribble-diffusion" target="_blank">Fork it on GitHub</Link> 
          or check out the <Link href="https://youtu.be/6z07OdbrWOs" target="_blank">video tutorial</Link>.
        </div>
      </div>

      {/* A container element with centered text and a margin-top of 8 units */}
      <div className="text-center lil-text mt-8">
        {/* Text followed by multiple Link components */}
        Powered by <Link href="https://github.com/lllyasviel/ControlNet" target="_blank">ControlNet</Link> by 
        <Link href="https://lllyasviel.github.io/Style2PaintsResearch/lvmin" target="_blank">Lyumin Zhang</Link>,{" "}
        <Link href="https://replicate.com/jagilley/controlnet-scribble?utm_source=project&utm_campaign=scribblediffusion" target="_blank">Replicate</Link>,{" "}
        <Link href="https://vercel.com/templates/ai" target="_blank">Vercel</Link>, and {" "}
        <Link href="https://upload.io" target="_blank">Upload</Link>.
      </div>
    </footer>
  );
}

// Export the Footer component as the default export of this module
export default Footer;
