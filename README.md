:checkered_flag: Artio - Gerenciador de comissões e projetos

Artio é um gerenciador de projetos para artistas, designers e freelancers que buscam um ambiente para gerenciar todos os elementos e recursos necessários para os seus trabalhos. Aqui, eles poderão organizar projetos e exibir seus trabalhos, além de permitir aos clientes visualizar o progresso do trabalho.

## :technologist: Membros da equipe

Sofia, Ciência da Computação

## :bulb: Objetivo Geral

Descrever o objetivo de geral do projeto

## :eyes: Público-Alvo

- Artistas
- Designers
- Freelancers em geral
- Clientes

## :star2: Impacto Esperado

É esperado que esta ferramenta auxilie os artistas na sua organização, permitindo que eles possam melhorar a sua produtividade e trabalhar melhor nos seus projetos.

## :people_holding_hands: Papéis ou tipos de usuário da aplicação

### Artista

- Pode acessar as funcionalidades de gerenciamento em nível de editor, podendo cadastrar novos projetos, editar seus projetos existentes e se comunicar com os clientes.

### Cliente

- Pode acessar as funcionalidades de gerenciamento em nível de leitor, visualizando o status dos projetos em que ele está como associado, além de poder comissionar os artistas presentes na plataforma.

### Usuário comum / não logado

- Pode visualizar os projetos públicos dos artistas, visualizando detalhes.

> Tenha em mente que obrigatoriamente a aplicação deve possuir funcionalidades acessíveis a todos os tipos de usuário e outra funcionalidades restritas a certos tipos de usuários.

## :triangular_flag_on_post: Principais funcionalidades da aplicação

### Gerenciamento de projetos e comissões

- Cada artista pode adicionar projetos ao seu perfil, podendo marcá-los como públicos ou privados -- estes podem ser acessados pelos autores e seus colaboradores.

### Visualização de projetos

- Cada artista pode marcar projetos como públicos, e estes poderão ser visualizados tanto no portifólio do artista como junto dos projetos de outros usuários em um feed coletivo.

### Solicitação de comissões

- Clientes e artistas podem enviar solicitações para artistas para a elaboração de projetos.

### Comunicação entre clientes e artistas

- Será possível trocar mensagens entre artistas e clientes.

## :spiral_calendar: Entidades ou tabelas do sistema

### Cliente/usuário

    - Nome
    - ID
    - E-mail
    - Senha
    - Redes sociais/contatos
    - Preferências
    - Descrição
    - Projetos contratados

### Artista

    (Coisas de usuário)
    - Portfólio
    - Projetos colaborados
    - Clientes

### Projeto

    - Nome
    - ID
    - Prazo
    - Categorias
    - Colaboradores
    - Público/privado
    - Descrição
    - Observações
    - Inspirações e referências

### Colaborador

    - Usuário
    - Projeto associado

### Solicitações

    - Usuário
    - ID
    - Artista
    - Descrição da solicitação
    - Anexos
    - Orçamento

### Portfólio

    - Projetos
    - Artista
