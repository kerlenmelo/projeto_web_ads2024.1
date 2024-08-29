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

function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (!cart.includes(productId)) {
        cart.push(productId);
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    alert('Produto adicionado ao carrinho!');
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
                <button class="btn-add-to-cart" data-id="${product.id}">Adicionar ao carrinho</button>
            `;

            containerPrincipal.appendChild(productCard);
        });

        // Adiciona event listener para todos os botões
        document.querySelectorAll('.btn-add-to-cart').forEach(button => {
            button.addEventListener('click', () => {
                const productId = button.getAttribute('data-id');
                addToCart(productId);
            });
        });
    } catch (error) {
        console.error("Erro ao renderizar os produtos:", error);
    }
}
