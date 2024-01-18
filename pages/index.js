import GithubLogo from "../components/github-logo";
import ReplicateLogo from "../components/replicate-logo";

export default function Home() {
  return (
    <div className="landing-page container flex-column mx-auto mt-24">
      <div className="hero mx-auto">
        <div className="hero-text text-center max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">
          🖍️ From rough sketches to masterpieces with Scribble Diffusion using {" "}
            <a href="https://replicate.com/rossjillian/controlnet?utm_source=project&utm_campaign=scribblediffusion">
              ControlNet
            </a>
            .
          </h1>

          <div className="cta my-24 flex justify-center space-x-5 items-center">
            <a
              className="text-white bg-black p-5 flex"
              href="https://github.com/replicate/scribble-diffusion?utm_source=project&utm_campaign=scribblediffusion"
            >
              <GithubLogo
                width={24}
                height={24}
                className="mr-2"
                fill="#ffffff"
              />
              Code on Github
            </a>
            <a
              className="text-white bg-black p-5 flex"
              href="https://replicate.com/rossjillian/controlnet?utm_source=project&utm_campaign=scribblediffusion"
            >
              <ReplicateLogo className="mr-2" width={24} />
              Explore AI models on Replicate
            </a>
          </div>
        </div>

      </div>
      <div className="flex-auto justify-center">
      <img
        className="mt-24"
        src="/scribble-diffusion.webp"
        alt="screenshot of Scribble Diffusion"
      />
      </div>
    </div>
  );
}