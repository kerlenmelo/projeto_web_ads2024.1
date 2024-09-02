import express from "express";
import cors from "cors"; 

import { routerProdutos } from "./routes/produtos.js";
import { routerHome, routerKit, routerSobre, routerCarrinho, routerProduto, routerContato } from "./routes/home.js";
import { routerKits } from "./routes/kits.js";


const app = express()

app.use(cors());
app.use(express.json());

app.use(express.static("public"));

app.use(routerKits);
app.use(routerProdutos);

app.use(routerHome);
app.use(routerKit);
app.use(routerSobre);
app.use(routerCarrinho);
app.use(routerProduto);
app.use(routerContato);

app.listen(3000, () => console.log("Servidor executando na porta 3000 ..."))