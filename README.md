# Explicação do código

Este projeto tem três partes principais: **HTML**, **CSS** e **JavaScript**.

## 1. HTML
O arquivo `index.html` monta a estrutura da página.

- A tela inicial tem a **lista de login**.
- A mesma tela mostra a **tabela de pontuação**.
- Depois existe a tela do quiz, que aparece quando o jogador começa.

## 2. CSS
O arquivo `style.css` serve para deixar a página organizada e bonita.

- Ele controla as cores.
- Ajusta os espaços.
- Estiliza os botões, caixas e tabela.
- Também esconde e mostra telas com a classe `hidden`.

## 3. JavaScript
O arquivo `script.js` faz a parte interativa.

### `questions`
É um array com as perguntas do quiz.

### `fixedLogins`
É a lista de logins prontos que aparecem na tela inicial.

### `loadRanking()` e `saveRanking()`
Essas funções usam `localStorage` para guardar os pontos no navegador.

### `renderLogins()`
Mostra os nomes da lista de login na home.

### `renderRanking()`
Mostra a tabela de pontuação.

### `startGame()`
Inicia o jogo com o nome escolhido pelo jogador.

### `showQuestion()`
Mostra a pergunta atual e as alternativas.

### `checkAnswer()`
Verifica se a resposta está certa e soma ponto quando acerta.

### `finishGame()`
Finaliza o jogo e atualiza a pontuação na tabela.

## Como explicar para o professor
Você pode dizer assim:

> "Meu projeto é um quiz sobre a Seleção Brasileira. Na tela inicial o usuário escolhe ou digita um login. Depois o JavaScript mostra as perguntas uma por uma, conta os acertos e salva a melhor pontuação no navegador com localStorage. Assim, a tabela de pontuação aparece na home e guarda os resultados de cada jogador."

## O que foi simplificado
- Menos perguntas.
- Menos funções.
- Visual mais simples.
- Código mais fácil de explicar.
