import { dbPromise } from './db.js';
async function seedDatabase() {
    const db = await dbPromise;

    // Inserir produtos
    const produtos = [
        { id: '1', img: '../img/brigadeiro.jpeg', titulo: 'Brigadeiro', descricao: 'Delicioso brigadeiro tradicional.', valor: 1.50 },
        { id: '2', img: '../img/casadinho.jpg', titulo: 'Beijinho', descricao: 'Beijinho de coco coberto com açúcar cristal.', valor: 1.50 },
        { id: '3', img: '../img/ovo_kitkat.png', titulo: 'Ovo de Páscoa ao Leite', descricao: 'Ovo de Páscoa feito com chocolate ao leite.', valor: 25.00 },
        { id: '4', img: '../img/ovo-pascoa-trufado.jpg', titulo: 'Ovo de Páscoa Trufado', descricao: 'Ovo de Páscoa trufado com recheio de brigadeiro.', valor: 35.00 },
        { id: '5', img: '../img/ovo-pascoa-branco.jpg', titulo: 'Ovo de Páscoa Branco', descricao: 'Ovo de Páscoa feito com chocolate branco.', valor: 28.00 },
        { id: '6', img: '../img/bolo-de-cenoura-com-cobertura-de-chocolate.jpg', titulo: 'Bolo de Cenoura', descricao: 'Bolo de cenoura com cobertura de chocolate.', valor: 20.00 },
        { id: '7', img: '../img/bolo-chocolate-jpg.jpg', titulo: 'Bolo de Chocolate', descricao: 'Bolo de chocolate com recheio de brigadeiro.', valor: 22.00 },
        { id: '8', img: '../img/torta-de-limao.jpg', titulo: 'Torta de Limão', descricao: 'Torta de limão com merengue.', valor: 18.00 },
        { id: '9', img: '../img/Pudim-de-leite.jpeg', titulo: 'Pudim de Leite', descricao: 'Pudim de leite condensado tradicional.', valor: 10.00 },
        { id: '10', img: '../img/palha-italiana.jpg', titulo: 'Palha Italiana', descricao: 'Doce de brigadeiro com biscoito.', valor: 3.00 },
        { id: '11', img: '../img/quindim.jpeg', titulo: 'Quindim', descricao: 'Doce de coco com ovos.', valor: 4.00 },
        { id: '12', img: '../img/cocada.jpg', titulo: 'Cocada', descricao: 'Cocada branca tradicional.', valor: 2.50 },
        { id: '13', img: '../img/brownie.jpg', titulo: 'Brownie', descricao: 'Brownie de chocolate com nozes.', valor: 5.00 },
        { id: '14', img: '../img/sonho.jpg', titulo: 'Sonho', descricao: 'Massa de sonho recheada com creme.', valor: 3.50 },
        { id: '15', img: '../img/churros.jpg', titulo: 'Churros', descricao: 'Churros recheado com doce de leite.', valor: 4.00 }
    ];

    for (const produto of produtos) {
        await db.run(
            `INSERT INTO produtos (id, img, titulo, descricao, valor) VALUES (?, ?, ?, ?, ?)`,
            [produto.id, produto.img, produto.titulo, produto.descricao, produto.valor]
        );
    }

    const kits = [
        { nome: 'Kit Brigadeiro', descricao: 'Um kit com uma variedade de brigadeiros.' },
        { nome: 'Kit Páscoa', descricao: 'Ovos de Páscoa sortidos.' },
        { nome: 'Kit Bolo e Torta', descricao: 'Inclui bolo de cenoura e torta de limão.' },
        { nome: 'Kit Doces Clássicos', descricao: 'Um kit com doces clássicos como pudim e quindim.' },
        { nome: 'Kit Sobremesas Especiais', descricao: 'Inclui brownie, churros e palha italiana.' }
    ];

    const kitProdutos = [
        { kit_id: 1, produto_id: '1', quantidade: 5 },
        { kit_id: 1, produto_id: '2', quantidade: 5 },
        { kit_id: 2, produto_id: '3', quantidade: 2 },
        { kit_id: 2, produto_id: '4', quantidade: 2 },
        { kit_id: 2, produto_id: '5', quantidade: 2 },
        { kit_id: 3, produto_id: '6', quantidade: 1 },
        { kit_id: 3, produto_id: '8', quantidade: 1 },
        { kit_id: 4, produto_id: '9', quantidade: 2 },
        { kit_id: 4, produto_id: '11', quantidade: 2 },
        { kit_id: 5, produto_id: '10', quantidade: 2 },
        { kit_id: 5, produto_id: '13', quantidade: 2 },
        { kit_id: 5, produto_id: '15', quantidade: 2 }
    ];

    for (const kit of kits) {
        await db.run(
            `INSERT INTO kits (nome, descricao) VALUES (?, ?)`,
            [kit.nome, kit.descricao]
        );
    }

    for (const kp of kitProdutos) {
        await db.run(
            `INSERT INTO kit_produtos (kit_id, produto_id, quantidade) VALUES (?, ?, ?)`,
            [kp.kit_id, kp.produto_id, kp.quantidade]
        );
    }
}

seedDatabase().then(()=>console.log("Dados inseridos no BD."));
