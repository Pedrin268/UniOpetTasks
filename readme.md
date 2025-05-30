# UniOpet Tasks

UniOpet Tasks é um sistema web simples para gerenciamento de tarefas pessoais e em grupo, desenvolvido para facilitar a organização de atividades acadêmicas ou profissionais. O projeto possui autenticação de usuários, cadastro, login, e permite criar, concluir e excluir tarefas.

## Funcionalidades

- Cadastro e login de usuários
- Proteção contra bots via Cloudflare Turnstile
- Criação de tarefas pessoais e de grupo
- Marcar tarefas como concluídas
- Excluir tarefas
- Interface responsiva com tema claro/escuro

## Tecnologias Utilizadas

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** PHP
- **Banco de Dados:** MySQL

## Requisitos

- PHP 7.4 ou superior
- Servidor web (Apache, Nginx, etc)
- MySQL 5.7 ou superior

## Configuração

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/Pedrin268/UniOpetTasks.git
   cd UniOpetTasks
   ```

2. **Configuração do Banco de Dados:**
   - Crie um banco de dados MySQL.
   - Importe o arquivo de estrutura SQL (caso exista).
   - Configure as variáveis de ambiente no arquivo `.env` (baseie-se no `.env-example`):

     ```
     DB_HOST=localhost
     DB_NAME=nome_do_banco
     DB_USER=usuario
     DB_PASS=senha
     ```

3. **Configuração do Backend:**
   - O backend está pronto para uso em `/backend`.
   - O backend deve ler as variáveis do `.env` para conectar ao banco.

4. **Configuração do Frontend:**
   - O frontend está pronto para uso em `/index.html`.
   - Abra no navegador ou configure o servidor web apontando para esta pasta.

5. **Turnstile (Anti-bot):**
   - O sistema já está configurado para usar o Cloudflare Turnstile.
   - Caso queira usar sua própria chave, altere o atributo `data-sitekey` nos formulários em `index.html` e caso não quiser usar apenas remover a linha Cloudflare Turnstile representado pela classe cf-turnstile.

## Como Usar

1. Acesse a página inicial.
2. Cadastre-se com nome, email, senha e (opcionalmente) código de convite.
3. Faça login.
4. Adicione tarefas pessoais ou de grupo.
5. Marque tarefas como concluídas ou exclua conforme necessário.
6. Use o botão de alternar tema para modo claro/escuro.

## Licença

Este projeto é livre para uso acadêmico e pessoal.

---
Desenvolvido por Pedro EGS_01