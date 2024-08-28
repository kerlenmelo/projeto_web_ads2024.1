import { dbPromise } from "../database/db.js";

async function getAllProducts() {
    // Obter os dados do BD
    const db = await dbPromise;
    const produtos = await db.all("SELECT * FROM produtos");
    return produtos;
}

export { getAllProducts }


async function getProductIds() {
    try {
        const products = await getAllProducts();
        const productIds = products.map(product => product.id);
        return productIds;
    } catch (error) {
        console.error("Erro ao obter os IDs dos produtos:", error);
        throw error; // ou lidere o erro de outra forma conforme necessário
    }
}

export {getProductIds}