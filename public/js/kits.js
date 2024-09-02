async function fetchKits() {
    try {
        const response = await fetch('http://localhost:3000/api/kits'); // Busca os kits
        if (!response.ok) {
            throw new Error('Erro ao buscar os kits');
        }
        const kitsData = await response.json();

        // Cria um objeto para agrupar produtos por kit_id
        const kitsGrouped = {};
        
        kitsData.forEach(item => {
            if (!kitsGrouped[item.kit_id]) {
                kitsGrouped[item.kit_id] = [];
            }
            kitsGrouped[item.kit_id].push(item);
        });

        return kitsGrouped;
    } catch (error) {
        console.error("Erro ao buscar os kits:", error);
        return {};
    }
}

async function fetchProducts() {
    try {
        const response = await fetch('http://localhost:3000/api/produtos');
        if (!response.ok) {
            throw new Error('Erro ao buscar os produtos');
        }
        return await response.json();
    } catch (error) {
        console.error("Erro ao buscar os produtos:", error);
        return [];
    }
}

async function renderKits() {
    try {
        const kitsGrouped = await fetchKits(); // Obtém kits agrupados por kit_id
        const products = await fetchProducts(); // Obtém todos os produtos

        const containerKits = document.querySelector('.container-kits');

        if (!containerKits) {
            console.error('Elemento container-kits não encontrado');
            return;
        }

        containerKits.innerHTML = ''; // Limpa o container antes de adicionar novos kits

        // Itera sobre cada kit_id
        Object.keys(kitsGrouped).forEach(kit_id => {
            const kitItems = kitsGrouped[kit_id];
            let kitValorTotal = 0;
            const produtosDetalhes = [];

            kitItems.forEach(item => {
                const produto = products.find(p => p.id === item.produto_id);
                if (produto) {
                    const valorTotalProduto = produto.valor * item.quantidade;
                    kitValorTotal += valorTotalProduto;

                    produtosDetalhes.push({
                        ...produto,
                        quantidade: item.quantidade,
                        valorTotal: valorTotalProduto
                    });
                }
            });

            // Renderiza o kit
            const kitCard = document.createElement('div');
            kitCard.classList.add('card-kit');

            
            kitCard.innerHTML = `
                <h3 class="nome-kit">Kit ID: ${kit_id}</h3>
                <ul>
                    ${produtosDetalhes.map(prod => `
                        <li>${prod.titulo} - ${prod.quantidade} x R$ ${prod.valor.toFixed(2)} = R$ ${prod.valorTotal.toFixed(2)}</li>
                    `).join('')}
                </ul>
                <span class="total-kit">Total do Kit: R$ ${kitValorTotal.toFixed(2)}</span>
                <button class="btn-add-to-cart" data-id="${kit_id}">Adicionar ao carrinho</button>
            `;

            containerKits.appendChild(kitCard);
        });

        // Adiciona event listener para todos os botões
        document.querySelectorAll('.btn-add-to-cart').forEach(button => {
            button.addEventListener('click', () => {
                const kitId = button.getAttribute('data-id');
                addToCart(kitId);
            });
        });
    } catch (error) {
        console.error('Erro ao renderizar kits:', error);
    }
}

async function addToCart(kitId) {
    const kitsGrouped = await fetchKits(); // Obtém kits agrupados por kit_id
    const products = await fetchProducts(); // Obtém todos os produtos
    const kitItems = kitsGrouped[kitId]; // Produtos do kit específico
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    kitItems.forEach(item => {
        const product = products.find(p => p.id === item.produto_id);
        if (product) {
            const existingProductIndex = cart.findIndex(cartItem => cartItem.id === product.id);
            if (existingProductIndex >= 0) {
                // Se o produto já está no carrinho, aumenta a quantidade
                cart[existingProductIndex].quantidade += item.quantidade;
            } else {
                // Caso contrário, adiciona o produto ao carrinho com a quantidade do kit
                cart.push({
                    ...product,
                    quantidade: item.quantidade
                });
            }
        }
    });

    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Kit adicionado ao carrinho!');
}

window.addEventListener("DOMContentLoaded", renderKits);
