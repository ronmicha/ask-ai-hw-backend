import {
  AskPayload,
  AskResponse,
  Chunk,
  InferenceRunnerEndpoints,
  inferenceRunnerService,
} from "../../services/inferenceRunner";

const { INFERENCE_RUNNER_API_KEY_1: INFERENCE_RUNNER_API_KEY } = process.env;

export const getChunks = async (
  question: string,
  minConfidence = 70
): Promise<AskResponse["chunks"]> => {
  const payload: AskPayload = { question };
  const headers = { "X-API-Key": INFERENCE_RUNNER_API_KEY };

  const response = await inferenceRunnerService.post(
    InferenceRunnerEndpoints.ASK,
    payload,
    { headers }
  );

  return response.data.chunks.filter(
    (chunk: Chunk) => chunk.confidence >= minConfidence
  );
};
