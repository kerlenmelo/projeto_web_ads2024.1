window.addEventListener("load", main);

let produtos = []

async function main() {
    try {
        const dados = await fetch("http://localhost:3000/api/produtos");
        const dadosJson = await dados.json();
        produtos = dadosJson;
        preencherCarrossel(produtos)
    } catch(e) {
        console.log("Error ao buscar produtos: ", e)
    }

    
}

async function preencherCarrossel(produtos) { 
    const carrosselContainer = document.querySelector('.carrossel-container');

    produtos.forEach(produto => {
        const item = document.createElement('div');
        item.classList.add('carrossel-item')
        item.innerHTML = 
        `
            <img src="${produto.img}" alt="${produto.titulo}">
            <p>${produto.titulo}</p>
        `
        carrosselContainer.appendChild(item);
    });
}

let currentIndex = 0;

document.querySelector('.next').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % produtos.length;
    updateCarrossel();
});

document.querySelector('.prev').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + produtos.length) % produtos.length;
    updateCarrossel();
});

function updateCarrossel() {
    const carrosselContainer = document.querySelector('.carrossel-container');
    const offset = -currentIndex * 100;
    carrosselContainer.style.transform = `translateX(${offset}%)`;
}