import {
  ChunkContentResponse,
  ChunkHolderEndpoints,
  chunkHolderService,
  GenerateTokenResponse,
} from "../../services/chunkHolder";

const { CHUNK_HOLDER_API_KEY_1: CHUNK_HOLDER_API_KEY } = process.env;

export const generateToken = async (): Promise<string> => {
  const headers = { "X-API-Key": CHUNK_HOLDER_API_KEY };

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
