import Replicate from "replicate";
import packageData from "../../../package.json";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
  userAgent: `${packageData.name}/${packageData.version}`,
});

export default async function handler(req, res) {
  const prediction = await replicate.predictions.get({
    predictionId: req.query.id,
  });

  // if (response.status !== 200) {
  //   let error = await response.json();
  //   res.statusCode = 500;
  //   res.end(JSON.stringify({ detail: error.detail }));
  //   return;
  // }

  res.end(JSON.stringify(prediction));
}
