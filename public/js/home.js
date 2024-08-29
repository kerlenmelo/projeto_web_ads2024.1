window.addEventListener("load", main);

let produtos = [];
let currentIndex = 0;
let isTransitioning = false;

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
        item.classList.add('carrossel-item');
        item.innerHTML = `
            <img src="${produto.img}" alt="${produto.titulo}">
            <p>${produto.titulo}</p>
        `;
        carrosselContainer.appendChild(item);
    });

    // Ajustar a largura do container do carrossel
    const totalWidth = produtos.length * (100 / 3);
    carrosselContainer.style.width = `${totalWidth}%`;
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
    const itemWidth = carrosselContainer.querySelector('.carrossel-item').offsetWidth;
    const totalItems = produtos.length / 2;

    carrosselContainer.style.transform = `translateX(${-currentIndex * itemWidth}px)`;

    carrosselContainer.addEventListener('transitionend', () => {
        isTransitioning = false;

        if (currentIndex >= totalItems) {
            currentIndex = 0;
            carrosselContainer.style.transition = 'none';
            carrosselContainer.style.transform = `translateX(0)`;
        } else if (currentIndex < 0) {
            currentIndex = totalItems - 1;
            carrosselContainer.style.transition = 'none';
            carrosselContainer.style.transform = `translateX(${-currentIndex * itemWidth}px)`;
        }

        setTimeout(() => {
            carrosselContainer.style.transition = 'transform 0.5s ease-in-out';
        });
    });
}
