import { Router } from 'express';
import { getAllProducts } from '../models/getAllProdutcs.js';


const routerProdutos = Router();


routerProdutos.get("/api/produtos", async (_, response) => {
    const produto = await getAllProducts()
    return response.status(200).json(produto)
});

export { routerProdutos}