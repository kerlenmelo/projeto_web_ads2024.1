window.addEventListener("load", main);

let produtos = [];

async function main() {
    try {
        const response = await fetch("http://localhost:3000/api/produtos");
        const dadosJson = await response.json();
        produtos = dadosJson;
        preencherCarrossel(produtos);
        configurarNavegacao();
    } catch (e) {
        console.log("Error ao buscar produtos: ", e);
    }
}

function preencherCarrossel(produtos) { 
    const carrosselContainer = document.querySelector('.carrossel-container');
    
    // Limpar o container antes de preencher com novos produtos
    carrosselContainer.innerHTML = '';

    produtos.forEach(produto => {
        const item = document.createElement('div');
        item.classList.add('carrossel-item');
        item.innerHTML = 
        `
            <img src="${produto.img}" alt="${produto.titulo}">
            <p>${produto.titulo}</p>
        `;
        carrosselContainer.appendChild(item);
    });

    // Atualizar o carrossel após preencher
    updateCarrossel();
}

let currentIndex = 0;

function configurarNavegacao() {
    const nextButton = document.querySelector('.next');
    const prevButton = document.querySelector('.prev');

    if (nextButton && prevButton) {
        nextButton.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % produtos.length;
            updateCarrossel();
        });

        prevButton.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + produtos.length) % produtos.length;
            updateCarrossel();
        });
    }
}

function updateCarrossel() {
    const carrosselContainer = document.querySelector('.carrossel-container');
    
    if (carrosselContainer && produtos.length > 0) {
        const itemWidth = 100 / produtos.length; // Supondo que cada item ocupa 100% / número de itens
        const offset = -currentIndex * itemWidth;
        carrosselContainer.style.transform = `translateX(${offset}%)`;
    }
}
