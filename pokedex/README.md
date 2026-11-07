Projeto de aplicação Pokédex desenvolvido para colocar em prática os conhecimentos adquiridos na disciplina de WEB II, do curso de Análise e Desenvolvimento de Sistemas (ADS) no IFPE.
O desenvolvimento deste projeto focou em consolidar as seguintes habilidades:

* **Consumo e Tratamento de Dados:** Integração com RESTful API (PokéAPI) e manipulação de objetos e arrays.
* **Ecossistema React:** Arquitetura baseada em Componentização, passagem de Props e gerenciamento de ciclo de vida com Hooks (useState, useEffect).
* **Lógica de Interface (UI/UX):** Renderização condicional, paginação de resultados, e filtros dinâmicos de busca.
* **Tratamento de Erros e Resiliência:** Gestão de estados de carregamento (loading), captura de falhas de conexão de rede (catch/finally) e alertas amigáveis de buscas não encontradas.

🛠️ Tecnologias e Bibliotecas Utilizadas

Este projeto foi desenvolvido utilizando as seguintes tecnologias:

* [React 19](https://react.dev/) + [Vite](https://vitejs.dev/): Biblioteca principal para a construção da interface de usuário, empacotada com Vite para um ambiente de desenvolvimento rápido e otimizado.
* [Chakra UI (v2)](https://chakra-ui.com/): Biblioteca de componentes moderna e baseada em *snippets*, utilizada para estruturar barras de progresso, paginação e acelerar o desenvolvimento do design de forma customizável.
* [Lucide React](https://lucide.dev/): Conjunto de ícones vetoriais leves para a interface (como na página de detalhes e botões de navegação).
* [PokéAPI](https://pokeapi.co/): RESTful API pública utilizada para consumir todos os dados reais dos Pokémons, como status, tipos e imagens.

🧠 Decisões de Implementação e Arquitetura

Para garantir uma aplicação performática e alinhada às boas práticas de desenvolvimento em React, as seguintes decisões técnicas foram tomadas em relação ao consumo da PokéAPI:

* **Estratégia de Busca (Filtro Local vs Global):** Optou-se por realizar uma requisição principal que carrega a lista base de Pokémons para a memória e, a partir dela, utilizar o método `.filter()` nativo do JavaScript para a barra de pesquisa. Isso elimina a necessidade de fazer uma nova requisição HTTP a cada letra digitada pelo usuário, economizando banda, evitando bloqueios por limite de requisições na PokéAPI e tornando a resposta visual instantânea.
* **Paginação no Cliente (Client-Side) vs Paginação na API:** Em vez de utilizar os parâmetros `limit` e `offset` para paginar as requisições direto na API (Server-Side), optou-se por carregar a lista completa de Pokémons em uma única requisição inicial e fatorar (paginar) a lista para exibição diretamente no frontend. 
* **Estratégia de Busca e UX:** Essa escolha arquitetural foi feita para garantir a eficiência da barra de pesquisa. Caso a paginação fosse feita pela API, a busca local ficaria "cega" para os dados das outras páginas (por exemplo, pesquisar por "Pikachu" falharia se o usuário estivesse na página 1 e o Pokémon estivesse na página 2). Ao ter todos os dados na memória do React, o método `.filter()` atua sobre a base completa, proporcionando uma busca instantânea e à prova de falhas, sem necessitar de requisições HTTP adicionais a cada letra digitada.
* **Tratamento de Erros:** Foram implementados dois níveis de validação. O primeiro é o `.catch()` do `fetch` para capturar falhas de infraestrutura (como perda de conexão com a internet). O segundo nível é uma validação lógica que exibe alertas amigáveis na tela caso a busca do usuário não retorne nenhum resultado válido no array local.
* **Gerenciamento de Ciclo de Vida e Loading:** O uso do `useEffect` foi atrelado aos filtros de tipo. A transição de estados de carregamento (`setCarregando`) foi encapsulada no bloco `.finally()` das Promises, garantindo que a tela de loading sempre desapareça, independentemente de a requisição ter sucesso ou falhar.


Para utilizar essa aplicação, é necessário que o Node.js esteja instalado em sua máquina.

1- Para clonar o repositório no Github, digite no seu terminal:
git clone https://github.com/DKlins/PokedexReactJS.git

2- Acesse a pasta da aplicação
-cd pokedex

3- Instale as dependências
-npm install

4- Rode o servidor localmente
-npm run dev

5- A aplicação estará disponível no link 'http://localhost:5173'