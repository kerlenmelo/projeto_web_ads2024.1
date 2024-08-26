import { dbPromise } from "../database/db.js";

async function getAllKits() {
    // Obter os dados do BD
    const db = await dbPromise;
    const kits_produtos = await db.all("SELECT * FROM kit_produtos");
    return kits_produtos;
}

export { getAllKits }