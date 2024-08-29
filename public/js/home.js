window.addEventListener("load", main);

let produtos = [];
let currentIndex = 0;
let isTransitioning = false;
const itemsPerPage = 5; // Número de itens exibidos por vez

async function main() {
    try {
        const response = await fetch("http://localhost:3000/api/produtos");
        const dadosJson = await response.json();
        produtos = dadosJson;

        // Duplicar os produtos para simular um loop infinito
        const duplicados = [...produtos, ...produtos];
        preencherCarrossel(duplicados);
        configurarNavegacao();
    } catch (e) {
        console.log("Erro ao buscar produtos: ", e);
    }
}

function preencherCarrossel(produtos) {
    const carrosselContainer = document.querySelector('.carrossel-container');
    carrosselContainer.innerHTML = '';

    produtos.forEach(produto => {
        const item = document.createElement('div');
        item.classList.add('carrossel-item'); // Aplicando a classe do item
        item.innerHTML = `
            <img src="${produto.img}" alt="${produto.titulo}" class="carrossel-img"> <!-- Aplicando a classe da imagem -->
            <p>${produto.titulo}</p>
        `;
        carrosselContainer.appendChild(item);
    });

}

function configurarNavegacao() {
    const nextButton = document.querySelector('.next');
    const prevButton = document.querySelector('.prev');

    nextButton.addEventListener('click', () => {
        if (!isTransitioning) {
            isTransitioning = true;
            currentIndex++;
            updateCarrossel();
        }
    });

    prevButton.addEventListener('click', () => {
        if (!isTransitioning) {
            isTransitioning = true;
            currentIndex--;
            updateCarrossel();
        }
    });
}

function updateCarrossel() {
    const carrosselContainer = document.querySelector('.carrossel-container');
    const totalItems = produtos.length * 2; // Porque duplicamos os itens
    const totalPages = totalItems / itemsPerPage;

    // Calcula a nova posição
    const newPosition = -currentIndex * (100 / itemsPerPage);

    carrosselContainer.style.transition = 'transform 0.5s ease-in-out';
    carrosselContainer.style.transform = `translateX(${newPosition}%)`;

    carrosselContainer.addEventListener('transitionend', function handleTransitionEnd() {
        if (currentIndex >= produtos.length) {
            currentIndex = 0;
            carrosselContainer.style.transition = 'none';
            carrosselContainer.style.transform = `translateX(0%)`;
        } else if (currentIndex < 0) {
            currentIndex = produtos.length - itemsPerPage;
            carrosselContainer.style.transition = 'none';
            carrosselContainer.style.transform = `translateX(${-currentIndex * (100 / itemsPerPage)}%)`;
        }
        setTimeout(() => {
            carrosselContainer.style.transition = 'transform 0.5s ease-in-out';
        }, 20); // Pequeno delay para garantir que a transição seja reabilitada
        carrosselContainer.removeEventListener('transitionend', handleTransitionEnd);
        isTransitioning = false;
    });
}
