import express from "express";
import router from "./routes/routes";
import cors from "cors";

const app = express();
app.use(express.json());

app.use(cors({
  origin: "http://localhost:3001",
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
}));

const API = "/api";
app.use(API, router);

const PORT = 3000;
const BASE_URL = `http://localhost:${PORT}`;
app.listen(PORT, () => {
  console.log(`Servidor rodando em ${BASE_URL}`);
});