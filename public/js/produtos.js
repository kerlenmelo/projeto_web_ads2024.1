window.addEventListener("DOMContentLoaded", renderProducts);

async function getAllProducts() {
    try {
        const response = await fetch('http://localhost:3000/api/produtos');
        if (!response.ok) {
            throw new Error('Erro ao buscar os produtos');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erro ao obter os produtos:", error);
        return [];
    }
}

async function addToCart(productId) {
    const products = await getAllProducts(); // Obtém todos os produtos
    const product = products.find(p => p.id === productId); // Encontra o produto com base no ID

    if (!product) {
        console.error('Produto não encontrado:', productId);
        return;
    }

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Verifica se o produto já está no carrinho
    const existingProductIndex = cart.findIndex(item => item.id === productId);

    if (existingProductIndex >= 0) {
        // Atualiza a quantidade se o produto já estiver no carrinho
        cart[existingProductIndex].quantidade += 1;
    } else {
        // Adiciona o produto ao carrinho com a quantidade inicial como 1
        product.quantidade = 1;
        cart.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
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
