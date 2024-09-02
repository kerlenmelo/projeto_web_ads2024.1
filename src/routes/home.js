import { Router } from 'express';
import path from 'path';


const routerHome = Router();
const routerKit = Router();
const routerSobre = Router();
const routerCarrinho = Router();
const routerProduto = Router();
const routerContato = Router();


routerHome.get("/", (req, res) => {
    res.sendFile(path.resolve('./public/html/index.html'));
});

routerKit.get("/kits", (req, res) => {
    res.sendFile(path.resolve ('./public/html/kits.html'));
})

routerSobre.get("/sobre", (req, res) => {
    res.sendFile(path.resolve ('./public/html/sobre.html'));
})

routerCarrinho.get("/carrinho", (req, res) => {
    res.sendFile(path.resolve ('./public/html/carrinho.html'));
})

routerProduto.get("/produtos", (req, res) => {
    res.sendFile(path.resolve ('./public/html/produtos.html'));
})

routerContato.get("/contato", (req, res) => {
    res.sendFile(path.resolve ('./public/html/contato.html'));
})

export { 
    routerHome, 
    routerKit,
    routerSobre,
    routerCarrinho,
    routerProduto,
    routerContato
}