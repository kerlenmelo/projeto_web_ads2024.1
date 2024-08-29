import express from "express";
import cors from "cors"; 

import { routerKits } from "./routes/kits.js";
import { routerProdutos } from "./routes/produtos.js";
import { routerHome } from "./routes/home.js";
import { routerAuth } from "./routes/auth.js";

const app = express()

app.use(cors());
app.use(express.json());

app.use(express.static("public"));

app.use(routerKits);
app.use(routerProdutos);
app.use(routerHome);
app.use(routerAuth)

app.listen(3000, () => console.log("Servidor executando na porta 3000 ..."))