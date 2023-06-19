import {
  AskPayload,
  AskResponse,
  Chunk,
  InferenceRunnerEndpoints,
  inferenceRunnerService,
} from "../../services/inferenceRunner";

export const getChunks = async (
  question: string,
  apiKey: string,
  minConfidence = 70
): Promise<AskResponse["chunks"]> => {
  const headers = { "X-API-Key": apiKey };
  const payload: AskPayload = { question };

  const response = await inferenceRunnerService.post(
    InferenceRunnerEndpoints.ASK,
    payload,
    { headers }
  );

  const filteredChunks = response.data.chunks.filter(
    (chunk: Chunk) => chunk.confidence >= minConfidence
  );

  return filteredChunks;
};
