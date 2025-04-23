const main = document.querySelector('main');
var produtos = [];

//Verificar se há algo no localStorage
var carrinho = JSON.parse(localStorage.getItem('carrinho'));
if (carrinho == null) {
    carrinho = [];
}

fetch("dados.json")
    .then(response => response.json())
    .then(data => {
        produtos = data;
    }).
    then(() => {
        exibirCards();
    });

function exibirCards() {
    produtos.forEach((produto, indice) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <img src="${produto.imagem}">
            <h2>${produto.modelo}</h2>
            <p>${produto.marca}</p>
            <p>R$ ${produto.valor_diaria.toFixed(2)}</p>
            <button onclick="mostrarDetalhes(${indice})">Detalhes</button>
        `;
        main.appendChild(card);
    });
}

function mostrarDetalhes(indice) {
    const detalhes = document.getElementById('detalhes');
    const titulo = document.querySelector('#detalhes h2');
    const imagem = document.querySelector('#detalhes img');
    const modelo = document.querySelector('#detalhes .modelo p');
    const ano = document.querySelector('#detalhes .ano p');
    const valor_diaria = document.querySelector('#detalhes .valor_diaria p');
    const botao = document.querySelector('#detalhes .rodape button');

    detalhes.classList.remove('oculto');
    titulo.innerHTML = produtos[indice].marca;
    imagem.src = produtos[indice].imagem;
    modelo.innerHTML = produtos[indice].modelo;
    ano.innerHTML = produtos[indice].ano;
    valor_diaria.innerHTML = `R$ ${produtos[indice].valor_diaria.toFixed(2)}`;
    botao.setAttribute('onclick', `adicionarCarrinho(${indice})`);
}
