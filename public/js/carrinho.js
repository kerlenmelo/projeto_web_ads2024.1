document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container-main .descricao');
    const totalElem = document.querySelector('.preco-total');
    const emptyMessage = document.createElement('p');
    let subtotal = 0;

    // Função para formatar o preço
    function formatPrice(price) {
        return `R$ ${price.toFixed(2).replace('.', ',')}`;
    }

    // Função para adicionar um item ao carrinho
    function addItemToCart(item) {
        if (!item || !item.img || !item.titulo || !item.peso || !item.quantidade || !item.valor) {
            console.error('Item inválido:', item);
            return;
        }

        const itemDiv = document.createElement('div');
        itemDiv.classList.add('item-carrinho');

        itemDiv.innerHTML = `
            <div class="imagem-item">
                <img src="${item.img}" alt="${item.titulo}">
            </div>
            <div class="informacao-item">
                <h3 class="titulo-item">${item.titulo}</h3>
                <p class="descricao-item">Peso: ${item.peso}g</p>
                <p class="descricao-item">Quantidade: ${item.quantidade}</p>
                <p class="preco">${formatPrice(item.valor * item.quantidade)}</p>
            </div>
        `;

        container.appendChild(itemDiv);
        subtotal += item.valor * item.quantidade;
    }

    // Função para calcular e atualizar o total
    function updateTotal() {
        totalElem.textContent = formatPrice(subtotal);
    }

    // Função principal
    function loadCart() {
        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

        console.log('Itens no carrinho:', cartItems); // Verifique o conteúdo dos itens

        container.innerHTML = ''; // Limpar conteúdo existente

        if (cartItems.length === 0) {
            // Mostrar mensagem de carrinho vazio
            emptyMessage.textContent = 'Carrinho vazio';
            emptyMessage.classList.add('carrinho-vazio'); // Adicione uma classe para estilizar a mensagem, se desejar
            container.appendChild(emptyMessage);
            totalElem.textContent = formatPrice(0); // Atualizar o total para R$ 0,00
        } else {
            cartItems.forEach(item => {
                console.log('Item carregado:', item); // Verifique o conteúdo de cada item
                addItemToCart(item);
            });

            updateTotal();
        }
    }

    loadCart();
});
