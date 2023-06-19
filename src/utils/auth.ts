const { INFERENCE_RUNNER_API_KEY_1, CHUNK_HOLDER_API_KEY_1 } = process.env;

export const getInferenceApiKey = (): string => {
  return INFERENCE_RUNNER_API_KEY_1!;
};

export const getChunkApiKey = (): string => {
  return CHUNK_HOLDER_API_KEY_1!;
};
