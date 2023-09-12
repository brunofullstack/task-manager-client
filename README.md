# Gestão de Usuários e Lista de Tarefas

Este repositório contém uma aplicação web para a gestão de lista de tarefas, construída com VueJS na camada web e Laravel/lumen na camada de API. A aplicação inclui recursos essenciais, como tela de login, CRUD completo de tarefas, autenticação JWT Token e suporte para criação do primeiro usuário via CLI. As telas de cadastro e edição de usuário e tarefas não são exibidas em modal, e a camada web é uma Single Page Application (SPA).

## Tecnologias Utilizadas

- VueJS
- Vuex
- Axios
- VueRouter
- Bootstrap Vue
- Laravel

## Instalação

Para executar a aplicação localmente, siga os passos abaixo:

1. Clone este repositório:

```bash
git clone https://github.com/seu-usuario/nome-do-repositorio.git
```

2. Navegue até a pasta do projeto:

```bash
cd nome-do-repositorio
```

3. Instale as dependências do frontend (VueJS):

```bash
cd frontend
npm install
```

4. Configure as variáveis de ambiente:

   - Crie um arquivo `.env.local` na pasta `frontend` e configure as variáveis de ambiente necessárias, como a URL da API e outras configurações específicas do ambiente.

5. Inicialize a aplicação frontend:

```bash
npm run serve
```

6. Navegue para [http://localhost:8080](http://localhost:8080) no seu navegador para acessar a aplicação.

7. Para executar o backend Laravel, siga as instruções no [repositório do Laravel](https://github.com/seu-usuario/nome-do-repositorio-backend).

## Funcionalidades Principais

A aplicação oferece as seguintes funcionalidades principais:

- Tela de Login: Os usuários podem fazer login na aplicação com suas credenciais.

- CRUD de Usuário:
  - Cadastro básico de usuário.
  - Edição de informações do usuário.
  - Exclusão de usuário.
  
- CRUD de Tarefas:
  - Cadastro de tarefas com nome, data de conclusão e status.
  - Edição de informações da tarefa.
  - Exclusão de tarefa.

- Autenticação JWT Token: As rotas da aplicação são protegidas e a autenticação é realizada na camada de API usando JWT Token.

- Envio de E-mails: O sistema envia um e-mail sempre que um cadastro for feito, editado ou deletado.

- Criação do Primeiro Usuário via CLI: O sistema oferece suporte para criar o primeiro usuário via linha de comando.

## Avaliação

Este projeto será avaliado com base no tempo de desenvolvimento, qualidade do código e conhecimento das tecnologias utilizadas. Os membros da equipe interna irão revisar o código e fornecer feedback.

Obrigado por conferir nosso projeto! Se tiver alguma dúvida ou precisar de assistência, não hesite em entrar em contato.