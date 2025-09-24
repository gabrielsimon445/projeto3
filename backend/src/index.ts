import express from "express";
import router from "./routes/routes";
import cors from "cors";

const app = express();
app.use(express.json());

const PORT = 3000;
const BASE_URL = `http://localhost:${PORT}`;
const API = "/api";
app.use(API, router);


app.use(cors({
  origin: BASE_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
}));

app.listen(PORT, () => {
  console.log(`Servidor rodando em ${BASE_URL}`);
});