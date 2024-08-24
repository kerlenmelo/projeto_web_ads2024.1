import { dbPromise } from "./db.js";

async function criarTabelas() {
    const db = await dbPromise

    await db.run(`CREATE TABLE IF NOT EXISTS produtos
        (
            id TEXT PRIMARY KEY,
            img TEXT,
            titulo TEXT,
            descricao TEXT,
            valor FLOAT
        )
    `);
    await db.run(`CREATE TABLE IF NOT EXISTS kits
        (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT,
            descricao TEXT
        )
    `);
    
    await db.run(`CREATE TABLE IF NOT EXISTS kit_produtos
        (
            kit_id INTEGER,
            produto_id TEXT,
            quantidade INTEGER,
            FOREIGN KEY (kit_id) REFERENCES kits(id),
            FOREIGN KEY (produto_id) REFERENCES produtos(id),
            PRIMARY KEY (kit_id, produto_id)
        )
    `);
}

criarTabelas();