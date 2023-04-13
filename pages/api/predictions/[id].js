import { NextResponse } from "next/server";
import Replicate from "replicate";
import packageData from "../../../package.json";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
  userAgent: `${packageData.name}/${packageData.version}`,
});

export default async function handler(req) {
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
