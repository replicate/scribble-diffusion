import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";
import Image from "next/image";

export const config = {
  runtime: "edge",
};

// This endpoint take a query parameter `id` which is the ID of a prediction
// and returns an Open Graph image for that prediction
export default async function handler(req) {
  const { searchParams } = req.nextUrl;
  const predictionId = searchParams.get("id");
  let inputImageURL, outputImageURL;

  // extract protocol and host from the request url, so we can call the local API
  const url = new URL(req.url);
  const protocol = url.protocol;
  const host = url.host;

  if (predictionId) {
    const response = await fetch(
      `${protocol}//${host}/api/predictions/${predictionId}`
    );
    const prediction = await response.json();

    if (response.status === 200) {
      inputImageURL = prediction.input.image;
      outputImageURL = prediction.output?.[prediction.output.length - 1];
    }
  }

  // Fallback to a default image
  if (!inputImageURL) {
    inputImageURL =
      "https://upcdn.io/FW25b4F/raw/uploads/scribble-diffusion/1.0.0/2023-02-17/scribble_input_2JrhzKQH.png";
    outputImageURL =
      "https://replicate.delivery/pbxt/fX5WyhTJ2LQ7ZC4Pq1TLZaHfLdEciFyfmKxU7FN8WLZhhaeBB/output_1.png";
  }

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          background: "#f6f6f6",
          width: "100%",
          height: "100%",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img alt="img" width="630" height="630" src={inputImageURL} />
        <img alt="img" width="630" height="630" src={outputImageURL} />
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
