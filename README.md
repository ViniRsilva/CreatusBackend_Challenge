# 🚀 Entrevista Backend na Creatus

O projeto consiste em uma API backend desenvolvida em Node.js utilizando o framework Fastify para gerenciamento de rotas. A autenticação de usuários é feita via JWT (jsonwebtoken), e os dados são armazenados em um banco de dados MongoDB. O objetivo principal é implementar um sistema de autenticação, um CRUD de usuários e uma rota privada para geração de relatórios

## 📋 Estrutura do Projeto

Todo o código do projeto está organizado dentro da pasta src, com a seguinte estrutura de diretórios:

- **db**: Contém as configurações e conexões com o MongoDB
- **hooks**: PreHandlers do Fastify, incluindo a verificação de autenticação
- **routes**: Contém as definições das rotas da API
- **schemas**: Schemas para validação de dados de entrada.
- **utils**: Funções auxiliares, como manipulação de JWT e funções de hashing de senhas. Rotas Implementadas Autenticação de Usuários

### 📦 Arquitetura do Código

- **src/db/configs**: Contém as configurações com o MongoDB, além de possuir uma função com objeto de sua conexão
- **src/db/services**: Contém todos os métodos necessários para realizar operações no banco, como o CRUD.
- **src/hooks**: Pre-handler do Fastify que verifica um token JWT a fim de verificar se o usuário está logado.
- **src/routes/schemas**: Schemas para validação de entrada de dados.
- **src/routes/routes.js**: Configuração central das rotas da API.
- **src/routes/usuarios.js**: Plugin com todas as rotas relacionadas a usuários.
- **src/utils**: Funções auxiliares, incluindo manipulação de JWT e hashing de senhas.

## ↪️ Rotas

> Todas as rotas possuem o prefix **/v1/users**

1. [POST] /login: Autentica um usuário e retorna um JWT token. CRUD de Usuários
2. [POST] /users: Cria um novo usuário.
3. [GET] /users: Lista todos os usuários.
4. [GET] /users/:id: Retorna detalhes de um usuário específico.
5. [PUT] /users/:id: Atualiza um usuário específico.
6. [DELETE] /users/:id: Remove um usuário específico. Rota Privada para Geração de Relatórios
7. [GET] /users/report: Gera um relatório em PDF ou CSV. Restrições: Acessível apenas para usuários logados com nível de acesso maior ou igual a 4.

## 🛠️ Tecnologias Utilizadas

- **Fastify**: Utilizado para gerenciamento de rotas devido à sua performance e simplicidade.
- **jsonwebtoken**: Utilizado para autenticação de usuários via JWT.
- **MongoDB**: Banco de dados NoSQL utilizado para armazenar informações dos usuários.

## 🔧 Instalação

Clone o repositório:

```
Copiar código git clone <URL_DO_REPOSITORIO> Instale as dependências:
```

Copiar código

```
cd <NOME_DO_REPOSITORIO>
npm install
```

Configure as variáveis de ambiente necessárias, como a URL do MongoDB e a chave secreta para o JWT.

> ultilize um arquivo .env na raiz do projeto para armazenar essas informações

Inicie o servidor:

```
npm start
```
