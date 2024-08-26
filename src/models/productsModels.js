import { dbPromise } from "../database/db.js";

async function getAllProducts() {
    // Obter os dados do BD
    const db = await dbPromise;
    const produtos = await db.all("SELECT * FROM produtos");
    return produtos;
}

export { getAllProducts }