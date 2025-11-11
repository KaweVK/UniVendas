# UniVendas

![Java](https://img.shields.io/badge/Java-21-blue.svg?logo=openjdk)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.5.7-brightgreen.svg?logo=spring-boot)

## 1. 📝 Descrição do Projeto

O UniVendas é um projeto de API RESTful desenvolvido em Java com Spring Boot. O objetivo principal é fornecer um backend para uma aplicação de vendas (e-commerce ou marketplace), permitindo o gerenciamento de usuários (vendedores/clientes) e itens à venda.

O projeto inclui funcionalidades completas de CRUD (Criar, Ler, Atualizar, Deletar) para usuários e itens, um sistema de autenticação de usuários baseado em JWT (JSON Web Token) e um mecanismo de busca avançada com filtros e paginação.

## 2. ✨ Funcionalidades Principais

* **Gerenciamento de Usuários:** CRUD completo para usuários.
* **Gerenciamento de Itens:** CRUD completo para itens, com associação a um usuário vendedor.
* **Autenticação:** Sistema de login com geração de token JWT para proteger e autenticar requisições.
* **Busca Avançada:** Endpoints de busca (`/search`) para usuários e itens, com suporte a filtros por nome, email, descrição, preço, categoria, etc.
* **Paginação:** Todas as buscas e listagens de múltiplos resultados são paginadas (usando `page` e `size`).
* **Tratamento de Erros:** Um `GlobalExceptionHandler` centralizado para tratar exceções de validação, registros duplicados, e outros erros de forma consistente.
* **Validação:** Uso de `jakarta.validation.constraints` (Bean Validation) nos DTOs para garantir a integridade dos dados de entrada.
* **Frontend de Teste:** Uma página HTML/CSS/JS simples (`frontend/index.html`) para testar interativamente todos os endpoints da API.

## 3. 🛠️ Tecnologias Utilizadas

Este projeto foi construído com as seguintes tecnologias e bibliotecas:

* **Backend:**
    * **Java 21**
    * **Spring Boot 3.5.7**
    * **Spring Web:** Para criar a API RESTful.
    * **Spring Data JPA:** Para persistência de dados e comunicação com o banco.
    * **Spring Security:** Para gerenciamento de autenticação e segurança.
    * **PostgreSQL (Driver):** Como driver do banco de dados.
    * **Lombok:** Para reduzir código boilerplate (como getters, setters, construtores).
    * **MapStruct:** Para mapeamento automático e eficiente entre Entidades e DTOs.
    * **Auth0 Java JWT:** Para criação e validação de tokens JWT.
* **Banco de Dados:**
    * **PostgreSQL**
* **Build & Gerenciamento:**
    * **Maven**
* **Frontend (Testador):**
    * HTML5
    * CSS3
    * JavaScript (com `fetch` API)

## 4. 🚀 Pré-requisitos para Execução

Antes de iniciar, garanta que você tem os seguintes softwares instalados:

* **JDK 21** (ou superior, conforme definido no `pom.xml`)
* **Maven 3.x**
* **PostgreSQL:** Um servidor PostgreSQL rodando.

## 5. 💻 Como Executar o Backend

1.  **Clone o Repositório:** (Se ainda não o fez)
    ```bash
    git clone [URL_DO_SEU_REPOSITORIO]
    cd univendas
    ```

2.  **Configure o Banco de Dados:**
    * Abra seu cliente PostgreSQL (psql, DBeaver, etc.).
    * Crie um novo banco de dados. O nome padrão esperado é `univendas`.
        ```sql
        CREATE DATABASE univendas;
        ```
    * O projeto utiliza migrações automáticas (Flyway não está configurado, mas o `ddl-auto: update` tentará criar/atualizar as tabelas). As tabelas `item` e `user` serão criadas com base nas entidades e no arquivo de migração `V1__create-table-item-and-user.sql`.


3.  **Configure a Aplicação (`application.yml`):**
    * Verifique se as configurações de datasource em `src/main/resources/application.yml` correspondem às suas credenciais do PostgreSQL:
        ```yaml
        spring:
          datasource:
            url: jdbc:postgresql://localhost:5432/univendas
            username: postgres
            password: postgres
        ```
    * O segredo do JWT (`api.security.token.secret`) tem o valor padrão `univ3nd4s`, mas pode ser sobrescrito por uma variável de ambiente `JWT_SECRET`.


4.  **Execute a Aplicação:**
    * Use o Maven para compilar e executar o projeto:
        ```bash
        mvn clean install
        mvn spring-boot:run
        ```
    * A API estará disponível em `http://localhost:8080`.

## 6. 🌐 Como Usar o Frontend de Teste

O projeto inclui uma interface de teste simples na pasta `frontend/`.

1.  Garanta que o backend (API) esteja em execução (`http://localhost:8080`).
2.  Abra o arquivo `frontend/index.html` diretamente no seu navegador de preferência (ex: clicando duas vezes no arquivo).
3.  A página possui abas para "Usuários", "Itens" e "Resposta da API".
4.  Você pode usar os formulários para criar, buscar, atualizar e deletar usuários e itens.
5.  A resposta da API (em JSON ou XML) será exibida na aba "Resposta da API".

## 7. 📚 Documentação da API (Endpoints)

A API está configurada para aceitar e responder em JSON (padrão) e XML.

### 7.1. 🔑 Autenticação

Endpoint base: `/login`

#### `POST /login`
* **Descrição:** Autentica um usuário e retorna um token JWT.
* **Controlador:** `AuthenticationController`
* **Corpo da Requisição (`AuthenticationDataDto`):**
    ```json
    {
      "email": "usuario@dcx.ufpb.br",
      "password": "sua_senha"
    }
    ```
* **Resposta de Sucesso (200 OK) (`TokenJwtDto`):**
    ```json
    {
      "token": "seu.token.jwt.aqui"
    }
    ```

### 7.2. 👤 Usuários

Endpoint base: `/users`
* **Controlador:** `UserController`

#### `POST /`
* **Descrição:** Cria um novo usuário.
* **Corpo da Requisição (`RegisterUserDTO`):**
    ```json
    {
      "name": "Nome Sobrenome",
      "email": "novo.usuario@dcx.ufpb.br",
      "password": "senhaForte123",
      "phoneNumber": "83912345678",
      "city": "Campina Grande"
    }
    ```
* **Resposta de Sucesso (201 Created):** Retorna a URL do novo recurso no cabeçalho `Location` e uma mensagem no corpo.

#### `GET /{id}`
* **Descrição:** Busca um usuário pelo seu UUID.
* **Resposta de Sucesso (200 OK) (`DefaultUserDTO`):**
    ```json
    {
      "id": "uuid-do-usuario",
      "name": "Nome Sobrenome",
      "email": "usuario@dcx.ufpb.br",
      "phoneNumber": "83912345678",
      "city": "Campina Grande"
    }
    ```

#### `PUT /{id}`
* **Descrição:** Atualiza um usuário existente.
* **Corpo da Requisição (`RegisterUserDTO`):** (Mesmo formato do `POST /`)
* **Resposta de Sucesso (204 No Content):** Indica que a atualização foi bem-sucedida.

#### `DELETE /{id}`
* **Descrição:** Deleta um usuário pelo seu UUID.
* **Resposta de Sucesso (200 OK):** Corpo vazio ou mensagem de sucesso.

#### `GET /search`
* **Descrição:** Pesquisa usuários com filtros e paginação.
* **Query Params:**
    * `name` (opcional): Filtra por nome (case-insensitive, like).
    * `email` (opcional): Filtra por email (case-insensitive, like).
    * `phone_number` (opcional): Filtra por número de telefone (case-insensitive, like).
    * `page` (opcional, default=0): Número da página.
    * `size` (opcional, default=10): Tamanho da página.
* **Resposta de Sucesso (200 OK):** Retorna um objeto `Page` contendo a lista de `DefaultUserDTO`.

### 7.3. 🛍️ Itens (Loja)

Endpoint base: `/shop`
* **Controlador:** `ItemController`

#### `POST /`
* **Descrição:** Cria um novo item.
* **Corpo da Requisição (`RegisterItemDTO`):**
    ```json
    {
      "name": "Notebook Super Rápido",
      "description": "Uma descrição bem detalhada do item, com pelo menos 20 caracteres.",
      "amount": 10,
      "price": 4500.00,
      "soldById": "uuid-do-usuario-vendedor",
      "category": "NOTEBOOK"
    }
    ```
* **Categorias Válidas (`ItemCategory`):** `TECNOLOGIA`, `MOVEL`, `ELETRODOMESTICO`, `CELULAR`, `COMPUTADOR`, `NOTEBOOK`, `PAPELARIA`, `COMIDA`.
* **Resposta de Sucesso (201 Created):** Retorna a URL do novo recurso no cabeçalho `Location` e uma mensagem no corpo.

#### `GET /{id}`
* **Descrição:** Busca um item pelo seu UUID.
* **Resposta de Sucesso (200 OK) (`DefaultItemDTO`):**
    ```json
    {
      "id": "uuid-do-item",
      "name": "Notebook Super Rápido",
      "description": "Uma descrição bem detalhada do item, com pelo menos 20 caracteres.",
      "amount": 10,
      "price": 4500.00,
      "soldBy": {
        "id": "uuid-do-usuario-vendedor",
        "name": "Nome Vendedor",
        "email": "vendedor@dcx.ufpb.br",
        "phoneNumber": "83912345678",
        "city": "Campina Grande"
      },
      "category": "NOTEBOOK"
    }
    ```

#### `PUT /{id}`
* **Descrição:** Atualiza um item existente.
* **Corpo da Requisição (`RegisterItemDTO`):** (Mesmo formato do `POST /`)
* **Resposta de Sucesso (204 No Content):** Indica que a atualização foi bem-sucedida.

#### `DELETE /{id}`
* **Descrição:** Deleta um item pelo seu UUID.
* **Resposta de Sucesso (200 OK):** Corpo com mensagem "Item deleted successfully.".

#### `GET /all`
* **Descrição:** Lista todos os itens de forma paginada.
* **Query Params:**
    * `page` (opcional, default=0): Número da página.
    * `size` (opcional, default=10): Tamanho da página.
* **Resposta de Sucesso (200 OK):** Retorna um objeto `Page` contendo a lista de `DefaultItemDTO`.

#### `GET /search`
* **Descrição:** Pesquisa itens com filtros e paginação.
* **Query Params:**
    * `name` (opcional): Filtra por nome (case-insensitive, like).
    * `description` (opcional): Filtra por descrição (case-insensitive, like).
    * `priceLess` (opcional): Define o limite inferior de preço (deve ser usado com `priceGreater`).
    * `priceGreater` (opcional): Define o limite superior de preço (deve ser usado com `priceLess`).
    * `category` (opcional): Filtra pela categoria exata (case-insensitive).
    * `page` (opcional, default=0): Número da página.
    * `size` (opcional, default=10): Tamanho da página.
* **Resposta de Sucesso (200 OK):** Retorna um objeto `Page` contendo a lista de `DefaultItemDTO`.

## 8. 🗄️ Estrutura do Banco de Dados

O schema do banco de dados é definido pelas entidades JPA e pelo arquivo de migração `V1__create-table-item-and-user.sql`.

```sql
-- Tabela de Usuários
CREATE TABLE user(
    id uuid NOT NULL PRIMARY KEY,
    name varchar(100) NOT NULL,
    email varchar(100) NOT NULL,
    password varchar(50) NOT NULL,
    phone_number varchar(15),
    city varchar(50),
    register_date timestamp,
    update_date timestamp
);

-- Tabela de Itens
CREATE TABLE item(
    id uuid NOT NULL PRIMARY KEY,
    name varchar(100) NOT NULL,
    description text NOT NULL,
    amount int NOT NULL,
    price numeric(18,2),
    category varchar(50) NOT NULL,
    id_user uuid NOT NULL references user(id), -- No arquivo V1...sql
    register_date timestamp,
    update_date timestamp
);
