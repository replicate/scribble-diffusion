import { Html, Head, Main, NextScript } from "next/document";

import pkg from "../package.json";
import Footer from "components/footer";

export default function Document() {
  return (
    <Html>
      <Head>
        <meta name="description" content={pkg.appMetaDescription} />
        <meta property="og:title" content={pkg.appName} />
        <meta property="og:description" content={pkg.appMetaDescription} />
        <meta
          property="og:image"
          content="https://scribblediffusion.com/opengraph.jpg"
        />
      </Head>

      <body className="bg-gray-100">
        <Main />
        <Footer />
        <NextScript />
      </body>
    </Html>
  );
}
