# Vendergas - Sistema de Gestão de Negócios (ERP)

Um sistema ERP (Enterprise Resource Planning) completo desenvolvido para auxiliar empresas no gerenciamento de **clientes**, **pedidos**, **produtos**, e **usuários**. O sistema também conta com autenticação via token e documentação interativa utilizando Swagger.

---
## Tecnologias Utilizadas

- **Node.js** com Express
- **MongoDB** (BD)
- **Joi** para validação de dados
- **JWT** para autenticação e proteção de rotas
- **Bcrypt** para criptografia de senha
- **Swagger** para documentação da API
- **Helmet**, **Cors**, **Rate Limiting** para segurança
- **Docker** 

---
## Stack utilizada

**Back-end:** Node, Express.

---

## Funcionalidades

- **Endpoints de autenticação via JWT**
- Rotas de cadastro e autenticação de usuários
- Rotas de cadastro e gerenciamento de **empresas**, **produtos**, **clientes** e **pedidos**
- Proteção de todas as rotas privadas com **JWT**
- Documentação da API com **Swagger**
- Middleware de segurança com **Helmet**, **CORS** e **Rate Limiting**

---

## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

`MONGO_URI`

`PORT`

`JWT_SECRET`

`SALT`

---

## Rodando localmente

Clone o projeto

```bash
  git clone  https://github.com/Hitjunior001/Vendergas.git
```

Entre no diretório do projeto

```bash
  cd vendervagas/server
```

Instale as dependências

```bash
  npm install
```

Inicie o servidor

```bash
  node ./src/server
```
---
# Front-end

Frontend do sistema **Vendergas ERP**, desenvolvido com React, utilizando Vite e TailwindCSS. O sistema permite a gestão de **clientes**, **pedidos**, **produtos**, e **usuários**, e autenticação de usuários.

---

## Tecnologias Utilizadas e Stack utilizada

- **React 19+** com SWC
- **TypeScript**
- **Vite** (bundler) para um desenvolvimento ágil
- **TailwindCSS** para estilização
- **React Router**
- **Axios** para requisições HTTP
- **React Icons**

---

## Funcionalidades

- Tela de **cadastro de usuário**
- Tela de **login com autenticação via token**
- Tela de **cadastro e gerenciamento de empresas**
- Tela de **cadastro e gerenciamento de produtos e clientes**
- Tela de **criação e gerenciamento de pedidos**

---

## Rodando localmente

Clone o projeto

```bash
  git clone  https://github.com/Hitjunior001/Vendergas.git
```

Entre no diretório do projeto

```bash
  cd vendervagas/react
```

Instale as dependências

```bash
  npm install
```

Inicie o servidor

```bash
  npm run dev
```
---

## Iniciando com Docker 🐳

Clone o projeto

```bash
  git clone  https://github.com/Hitjunior001/Vendergas.git
```

Entre no projeto

```bash
  cd vendergas
```

Construa o projeto no docker

```bash
  cd vendergas
```

```bash
docker-compose up --build
```

---

## *Objetivo* 

Este projeto foi desenvolvido exclusivamente por *Reginaldo de Oliveira* para fins de **avaliação técnica** em processo seletivo.  

---

## Autores

- [@Hitjunior001](https://www.github.com/hitjunior001)
