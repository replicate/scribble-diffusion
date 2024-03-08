import Link from "next/link";

export default function Welcome({ handleTokenSubmit }) {
  return (
    <div className="landing-page container flex-column mx-auto mt-24">
      <div className="hero mx-auto">
        <div className="hero-text text-center max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">
            <a href="https://replicate.com?utm_source=project&utm_campaign=scribblediffusion">
              Scribble Diffusion turns your sketch into a refined image using
              AI.
            </a>
          </h1>
        </div>

        <div className="mt-12 max-w-xl mx-auto text-center">
          <p className="text-base text-gray-500">
            To get started, grab your{" "}
            <Link
              className="underline"
              href="https://replicate.com/account/api-tokens?utm_campaign=scribblediffusion-diy&utm_source=project"
              target="_blank"
              rel="noopener noreferrer"
            >
              Replicate API token
            </Link>{" "}
            and paste it here:
          </p>

          <form onSubmit={handleTokenSubmit}>
            <label htmlFor="api-key" className="sr-only">
              API token
            </label>
            <input
              type="text"
              name="api-key"
              id="api-key"
              className="block mt-6 w-full p-3 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-xl"
              placeholder="r8_..."
              minLength="40"
              maxLength="40"
              required
            />
            <div className="mt-5 sm:mt-6 sm:gap-3">
              <button
                type="submit"
                className="inline-flex w-full justify-center rounded-md bg-black p-3 text-xl text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 sm:col-start-2"
              >
                Start scribbling &rarr;
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
