import express, { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import {
  chunkHolderController,
  inferenceRunnerController,
} from "../controllers";
import { Chunk } from "../services/inferenceRunner";
import { ChunkContent } from "../services/chunkHolder";

const router = express.Router();

export const aggregateChunks = (
  chunks: Chunk[],
  chunksContent: ChunkContent[]
) => {
  return chunks.map((chunk, index) => ({
    confidence: chunk.confidence,
    content: chunksContent[index],
  }));
};

router.post("/", async (req: Request, res: Response) => {
  const { question } = req.body;

  if (!question) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "No question was provided" });
    return;
  }

  try {
    console.debug("Sending request to inference runner");
    const chunks = await inferenceRunnerController.getChunks(question);

    console.debug("Generating access token");
    const accessToken = await chunkHolderController.generateToken();

    console.debug("Fetching chunks content");
    const chunkContentPromises = chunks.map(({ chunkId }) => {
      return chunkHolderController
        .getChunkContent(chunkId, accessToken)
        .catch((e) => {
          console.error(
            `Failed to get chunk content. Chunk ID: ${chunkId}.\n${e}`
          );
        });
    });
    const chunksContent = await Promise.all(chunkContentPromises);

    console.debug("Aggregating results");
    const aggregatedChunks = aggregateChunks(chunks, chunksContent);

    res.json({ chunks: aggregatedChunks });
  } catch (e) {
    console.error(e);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: (e as Error).message });
  }
});

export default router;
