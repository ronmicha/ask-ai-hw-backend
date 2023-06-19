import {
  ChunkContentResponse,
  ChunkHolderEndpoints,
  chunkHolderService,
  GenerateTokenResponse,
} from "../../services/chunkHolder";

export const generateToken = async (apiKey: string): Promise<string> => {
  const headers = { "X-API-Key": apiKey };

  const response = await chunkHolderService.post(
    ChunkHolderEndpoints.GENERATE_TOKEN,
    {},
    { headers }
  );

  return (response.data as GenerateTokenResponse).token;
};

export const getChunkContent = async (
  chunkId: string,
  token: string
): Promise<ChunkContentResponse> => {
  const headers = { Authorization: token };

  const parsedEndpoint = ChunkHolderEndpoints.CHUNK_CONTENT.replace(
    ":chunkId",
    chunkId
  );

  const response = await chunkHolderService.get(parsedEndpoint, { headers });

  return response.data as ChunkContentResponse;
};
