import express from "express";
import { routerKits } from "./routes/kits.js";
import { routerProdutos } from "./routes/home.js";
import cors from "cors"; 
const app = express()

app.use(cors());
app.use(express.json());

app.use(express.static("public"));

app.use(routerKits);
app.use(routerProdutos);
app.listen(3000, () => console.log("Servidor executando na porta 3000 ..."))