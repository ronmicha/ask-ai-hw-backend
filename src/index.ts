import express, { Express } from "express";
import cors from "cors";
import generalRouter from "./routes/general";
import askRouter from "./routes/ask";

const app: Express = express();
const { PORT } = process.env;

app.use(express.json());
app.use(cors());

app.use("/", generalRouter);
app.use("/ask", askRouter);

app.listen(PORT, () => {
  console.log(`⚡️ Server is running at http://localhost:${PORT}`);
});
