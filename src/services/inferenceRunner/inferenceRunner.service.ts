import axios from "axios";

const { INFERENCE_RUNNER_URL } = process.env;

const instance = axios.create({
  baseURL: INFERENCE_RUNNER_URL,
});

export const inferenceRunnerService = instance;
