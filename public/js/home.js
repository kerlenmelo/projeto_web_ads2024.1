window.addEventListener("load", main);

let produtos = []

async function main() {
    const dados = await fetch("http://localhost:3000/api/produtos");
    const dadosJson = await dados.json();
    produtos = dadosJson;

    
}