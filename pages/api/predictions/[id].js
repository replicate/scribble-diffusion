import replicate from "replicate";

export default async function handler(req, res) {
  const prediction = await replicate.prediction(req.query.id).load();

  if (prediction.error) {
    res.statusCode = 500;
    res.end(JSON.stringify({ detail: prediction.error }));
    return;
  }

  res.end(JSON.stringify(prediction));
}
