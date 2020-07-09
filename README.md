# axur_challenger

# Dependências:

- Yarn v1.22.0
- Nodejs v10.21.0

# Instalação do ambiente:

Instale as dependências do projeto via yarn

```bash
$ yarn 
```
# Estrutura do projeto

├── install-notes.txt  - Este Arquivo;
├── package.json       - Detalhes do projeto, dependências e scripts de inicialização;
├── src                - Fonte do projeto
│   ├── config         - Arquivo de configuração
│   ├── data           - Arquivos de importação CSV
│   ├── server.ts      - Processo principal
│   └── services       - Serviços externos (API)
├── tsconfig.json      - Definições do typescript
└── yarn.lock          - Definições de versões dos pacotes

# Configuração do ambiente

 As configurações do projeto estão no arquivo ```src/config/index.ts```
 
 São configuráveis:
 
 * base_url - URL base para a Api do Hubspot
 * api_key - Chave da API
 * list_name - Nome base da lista para fazer Match com eventuais outras listas no Hubspot.
 * csv_load_file - Nome do arquivo de importação

# Rodando o projeto:

```bash
$ yarn server
```

Ao iniciar o projeto é consultado via API a existência da lista de contatos conforme padrão estabelecido no src/config/index.ts
Se a lista não existir, será criada e os contatos importados. Caso já exista a aplicação segue o fluxo normal.

O serviço rodará no endereço ```localhost:3333```. É disponibilizado um endpoint na rota /contacts GET o mesmo fornece a consulta na api do Hubspot




