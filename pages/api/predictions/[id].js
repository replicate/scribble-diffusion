import { NextResponse } from "next/server";
import Replicate from "replicate";
import packageData from "../../../package.json";

export default async function handler(req) {
  const authHeader = req.headers.get("authorization");
  const replicate_api_token = authHeader.split(" ")[1]; // Assuming a "Bearer" token

  const replicate = new Replicate({
    auth: replicate_api_token,
    userAgent: `${packageData.name}/${packageData.version}`,
  });
  const predictionId = req.nextUrl.searchParams.get("id");
  const prediction = await replicate.predictions.get(predictionId);

  if (prediction?.error) {
    return NextResponse.json({ detail: prediction.error }, { status: 500 });
  }

  return NextResponse.json(prediction);
}

export const config = {
  runtime: "edge",
};
