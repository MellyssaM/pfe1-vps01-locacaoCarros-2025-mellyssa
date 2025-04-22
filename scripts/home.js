const main = document.querySelector('main');
var produtos = [];

//Verificar se há algo no localStorage
var carrinho = JSON.parse(localStorage.getItem('carrinho'));
if (carrinho == null) {
    carrinho = [];
}

fetch('../assets/dados.json')
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
            <img src="${produto.imagem}" alt="${produto.nome}">
            <h2>${produto.modelo}</h2>
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
    titulo.innerHTML = produtos[indice].nome;
    imagem.src = produtos[indice].imagem;
    modelo.innerHTML = produtos[indice].modelo;
    ano.innerHTML = produtos[indice].ano;
    valor_diaria.innerHTML = `R$ ${produtos[indice].valor_diaria.toFixed(2)}`;
    botao.setAttribute('onclick', `adicionarCarrinho(${indice})`);
}

function adicionarCarrinho(indice) {
    const produto = produtos[indice];
    //Verifica se o produto já está no carrinho
    const produtoExistente = carrinho.find(item => item.id === produto.id);
    if (produtoExistente) {
        produtoExistente.quantidade += 1; // Incrementa a quantidade
        produtoExistente.total = produtoExistente.quantidade * (produto.marca + frete); // Atualiza o total
        // Atualiza o total do produto existente no carrinho
        const index = carrinho.indexOf(produtoExistente);
        if (index > -1) {
            carrinho[index] = produtoExistente; // Atualiza o produto existente no carrinho
        }
    } else {
        produto.quantidade = 1; // Define a quantidade inicial como 1
        produto.total = produto.marca + frete; // Define o total inicial
        carrinho.push(produto);
    }
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    window.location.href = 'carrinho.html';
    const detalhes = document.getElementById('detalhes');
}