const cardContainer = document.querySelector(".card-container");
const botaoBusca = document.querySelector("#botao-busca");
const inputBusca = document.querySelector("#input-busca");

let dados = [];

async function fetchDados() {
    try {
        const resposta = await fetch("data.json");
        dados = await resposta.json();
        renderizarcards(dados);
    } catch (error) {
        console.error("Erro ao buscar os dados:", error);
    }
}

function IniciarBusca() {
    const termoBusca = inputBusca.value.toLowerCase();
    const resultados = dados.filter(dado => 
        dado.nome.toLowerCase().includes(termoBusca) || 
        dado.descricao.toLowerCase().includes(termoBusca)
    );
    renderizarcards(resultados);
}

function renderizarcards(dados) {
    cardContainer.innerHTML = ""; // Limpa o container antes de renderizar os novos cards
    for (let dado of dados) {
        let article = document.createElement("article");
        article.classList.add("card"); // Adiciona a classe para estilização e cursor

        // Cria o HTML para as tags, envolvendo-as em um container
        const tagsHtml = `<div class="card-tags">` + dado.tags.map(tag => `<span class="tag">${tag}</span>`).join('') + `</div>`;

        article.innerHTML = `
                <img src="${dado.imagem}" alt="Capa do jogo ${dado.nome}" class="card-image">
                <div class="card-content">
                    <h2>${dado.nome}</h2>
                    <p class="card-info">${dado.data_criacao}</p>
                    <p class="card-description">${dado.descricao}</p>
                    ${tagsHtml}
                    <a href="${dado.link}" target="_blank">Saiba mais</a>
                </div>`;

        // Adiciona o evento de clique ao card inteiro
        article.addEventListener('click', () => {
            window.open(dado.link, '_blank');
        });

        cardContainer.appendChild(article);
    }
}

botaoBusca.addEventListener("click", IniciarBusca);
fetchDados(); // Carrega os dados iniciais ao carregar a página