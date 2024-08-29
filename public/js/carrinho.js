document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.item-carrinho-container');
    const totalElem = document.querySelector('#total');
    const subtotalElem = document.querySelector('#subtotal');
    const emptyMessage = document.createElement('p');
    const clearCartButton = document.getElementById('clear-cart');
    const cupomInput = document.querySelector('.item-cupom .input-cupom');
    const cupomValor = document.getElementById('desconto');
    const taxaEntrega = 10;
    const valorCupom = 15;

    // Função para formatar o preço
    function formatPrice(price) {
        return `R$ ${price.toFixed(2).replace('.', ',')}`;
    }

    // Função para remover um item do carrinho
    function removeItemFromCart(itemId) {
        let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        cartItems = cartItems.filter(item => item.id !== itemId);
        localStorage.setItem('cart', JSON.stringify(cartItems));
        loadCart();
    }

    // Função para alterar a quantidade de um item
    function updateItemQuantity(itemId, increment) {
        let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        const item = cartItems.find(item => item.id === itemId);

        if (item) {
            item.quantidade += increment;
            if (item.quantidade <= 0) {
                removeItemFromCart(itemId);
            } else {
                localStorage.setItem('cart', JSON.stringify(cartItems));
                loadCart();
            }
        }
    }

    // Função para adicionar um item ao carrinho
    function addItemToCart(item) {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('item-carrinho');

        itemDiv.innerHTML = `
            <div class="imagem-item">
                <img src="${item.img}" alt="${item.titulo}">
            </div>
            <div class="informacao-item">
                <h3 class="titulo-item">${item.titulo}</h3>
                <p class="descricao-item">Quantidade: ${item.quantidade}</p>
                <p class="preco">${formatPrice(item.valor * item.quantidade)}</p>
                <div class="botoes-quantidade">
                    <button class="btn-diminuir" data-id="${item.id}">-</button>
                    <button class="btn-aumentar" data-id="${item.id}">+</button>
                    <button class="btn-remover" data-id="${item.id}">Remover</button>
                </div>
            </div>
        `;

        container.appendChild(itemDiv);
    }

    // Função para calcular e atualizar o total
    function updateTotal() {
        let subtotal = 0;
        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

        cartItems.forEach(item => {
            subtotal += item.valor * item.quantidade;
        });

        const cupom = cupomInput.value.trim() ? valorCupom : 0;
        const total = subtotal + taxaEntrega - cupom;

        // Atualizar os valores na página
        subtotalElem.textContent = `${formatPrice(subtotal)}`;
        totalElem.textContent = `${formatPrice(total)}`;
    }

    // Função para carregar o carrinho
    function loadCart() {
        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

        container.innerHTML = ''; // Limpar conteúdo existente

        if (cartItems.length === 0) {
            // Mostrar mensagem de carrinho vazio
            emptyMessage.textContent = 'Carrinho vazio';
            emptyMessage.classList.add('carrinho-vazio'); // Adicione uma classe para estilizar a mensagem, se desejar
            container.appendChild(emptyMessage);
            subtotalElem.textContent = 'R$ 0,00'; // Atualizar o subtotal para R$ 0,00
            totalElem.textContent = 'R$ 10,00'; // Atualizar o total considerando apenas taxa e cupom
        } else {
            cartItems.forEach(item => {
                addItemToCart(item);
            });

            updateTotal();

            // Adicionar event listeners para os botões de alterar quantidade e remover item
            document.querySelectorAll('.btn-diminuir').forEach(button => {
                button.addEventListener('click', () => updateItemQuantity(button.getAttribute('data-id'), -1));
            });

            document.querySelectorAll('.btn-aumentar').forEach(button => {
                button.addEventListener('click', () => updateItemQuantity(button.getAttribute('data-id'), 1));
            });

            document.querySelectorAll('.btn-remover').forEach(button => {
                button.addEventListener('click', () => removeItemFromCart(button.getAttribute('data-id')));
            });
        }
    }

    // Esvaziar o carrinho
    if (clearCartButton) {
        clearCartButton.addEventListener('click', () => {
            localStorage.removeItem('cart');
            cupomInput.value = ''; // Limpar o valor do cupom
            cupomValor.textContent = '- R$ 0,00'; // Atualizar o valor exibido do cupom
            loadCart();
        });
    } else {
        console.error('Elemento com ID "clear-cart" não encontrado.');
    }

    // Atualizar total quando o valor do cupom mudar
    if (cupomInput) {
        cupomInput.addEventListener('input', updateTotal);
        cupomValor.textContent = '- R$ 15,00';
    } else {
        console.error('Elemento do cupom não encontrado.');
    }

    loadCart();
});
