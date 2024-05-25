<h2>ANONYM CHALLENGE</h2>

<h3>Motivação </h3>

Essa aplicação usa como base o padrão de arquitetura em camadas e o paradigma funcional. Mas pela natureza do desafio, se fez necessário adicionar apenas camadas que agregam valor e consequentemente atendem aos requisitos. A solução visa evitar excessos de complexidade e rigidez.

#

<h3>Instruções para executar o projeto</h3>

Dependências: node.js [v20.12.0] docker docker-compose

Este projeto usa o Volta como gerenciador de ferramentas de linha de comando JavaScript
Cado deseje utilizá-lo segue guia instalação:
[docs-volta](https://docs.volta.sh/guide/getting-started)

Instale a versão do node.js fixada no arquivo package.json

```zsh
  volta install node@[version]
```

Verifique a instalação

```zsh
  volta list
```

_atenção: todos os comandos a seguir devem ser executados na raiz do projeto_

#

Instale as dependências

```zsh
  npm install
```

Crie o arquivo _.env_ conforme o arquivo _.env.sample_

Execute o comando abaixo para prover o container do banco de dados

```zsh
  docker-compose up -d
```

Execute as migrações do banco de dados

```zsh
  npm run migrations
```

Agora basta subir o servidor com o comando abaixo

```zsh
  npm run dev
```

#

<h3>Testes unitários</h3>

Execute o comando a seguir para rodar os testes

```zsh
  $ npm run test
```

_A prioridade foi testar as funções puras, especificamente as que realizam operações sensíveis. Mas obviamente a intenção era entregar uma maior cobertura_

#

<h3>Informações complementares</h3>

Você vai encontrar alguns pontos no código-fonte onde faço o uso do tipo _any_, mas não implica dizer que não tentei evitá-los ou deixei de pensar na segurança e solidez de tipo (type safety).

Na raiz do projeto você vai encontrar um arquivo chamado _api-doc.postman.json_. Basta importá-lo no Postman para obter as informações das rotas e realizar os testes funcionais.