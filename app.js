console.log('Olá mundo');

// Função para criar um cartão dinâmico com base nos dados do flashcards.json
function criaCartao(categoria, subcategoria, pergunta, resposta, exemplo) {
    let container = document.getElementById('container');
    let cartao = document.createElement('article');
    cartao.className = 'cartao';
    cartao.innerHTML = `
        <div class="conteudo-cartao">
            <h3>${categoria + " - " + subcategoria}</h3>
            <div class="pergunta-cartao">
                <p>${pergunta}</p>
            </div>
            <div class="resposta-cartao">
                <p>${resposta}</p>

                <div class="exemplo-cartao">
                    <p>
                    Exemplo:
                    <br>
                    <br>
                    <code id="codigo-exemplo">
                    ${exemplo}
                    </code>
                    <button class="botao-copiar" onclick="copyToClickBoard()">Copiar</button>
                    </p>
                </div>
            </div>
        </div>
    `;

    let respostaVisivel = false;

    // Função para alternar a visibilidade da resposta ao clicar no cartão
    function virarCartao() {
        respostaVisivel = !respostaVisivel;
        cartao.classList.toggle('active', respostaVisivel);
    }

    cartao.addEventListener('click', virarCartao);

    container.appendChild(cartao);
}

// Função para carregar os flashcards do arquivo JSON
function carregarFlashcards() {
    fetch('flashcards.json')
        .then(response => response.json())
        .then(flashcards => {
            flashcards.forEach(flashcard => {
                let { Categoria, Subcategoria, Pergunta, Resposta, Exemplo } = flashcard;
                criaCartao(Categoria, Subcategoria, Pergunta, Resposta, Exemplo);
            });
        })
        .catch(error => console.error('Erro ao carregar os flashcards:', error));
}

// Chama a função para carregar e exibir os flashcards
carregarFlashcards();

// Função de copiar
function copyToClickBoard(){
    var content = document.getElementById('codigo-exemplo').innerHTML;

    navigator.clipboard.writeText(content);
}

