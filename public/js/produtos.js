window.addEventListener("DOMContentLoaded", renderProducts);
async function getAllProducts() {
    try {
        const response = await fetch('http://localhost:3000/api/produtos');
        if (!response.ok) {
            throw new Error('Erro ao buscar os produtos');
        }
        const data = await response.json();
        return data;  // Agora retorna diretamente o array de produtos
    } catch (error) {
        console.error("Erro ao obter os produtos:", error);
        return [];
    }
}


async function renderProducts() {
    try {
        const products = await getAllProducts();
        const containerPrincipal = document.querySelector('.container-principal');

        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('card-produto');

            productCard.innerHTML = `
                <img src="${product.img}" alt="${product.titulo}">
                <h3>${product.titulo}</h3>
                <p>${product.descricao}</p>
                <span>R$ ${product.valor.toFixed(2)}</span>
            `;

            containerPrincipal.appendChild(productCard);
        });
    } catch (error) {
        console.error("Erro ao renderizar os produtos:", error);
    }
}

renderProducts();
