import prisma from "./prisma";

export default async function upsertPrediction(predictionData) {
  console.log("🤔 upsert prediction? ", predictionData.id);

  if (predictionData?.status !== "succeeded") {
    console.log("🙈 skiping incomplete or unsuccesful prediction");
    return;
  }

  const prediction = {
    uuid: predictionData.id,
    input: predictionData.input,
    output: predictionData.output,
    status: predictionData.status,
    created_at: predictionData.created_at,
    started_at: predictionData.started_at,
    completed_at: predictionData.completed_at,
    version: predictionData.version,
    metrics: predictionData.metrics,
    error: predictionData.error,
  };

  try {
    await prisma.prediction.upsert({
      where: {
        uuid: prediction.uuid,
      },
      update: prediction,
      create: prediction,
    });

    console.log("✅ upserted prediction ", prediction.uuid);
  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
}
