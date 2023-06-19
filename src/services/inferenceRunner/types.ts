export type AskPayload = {
  question: string;
};

export type Chunk = {
  confidence: number;
  chunkId: string;
};

export type AskResponse = {
  chunks: Chunk[];
};
