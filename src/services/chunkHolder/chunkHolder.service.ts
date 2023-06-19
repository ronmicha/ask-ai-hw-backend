import axios from "axios";

const { CHUNK_HOLDER_URL } = process.env;

const instance = axios.create({
  baseURL: CHUNK_HOLDER_URL,
});

export const chunkHolderService = instance;
