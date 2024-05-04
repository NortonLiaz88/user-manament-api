## Setup

### Instalando o Node

```shell
sudo apt update
sudo apt install nodejs
```

Para verificar se o Node foi instalado, execute

```shell
node -v
npm -v
```

### Instalando Yarn

Caso a versão do seu NodeJS seja superior a 16.10, utilize o seguinte comando:

```
corepack enable
```

Caso seja inferior, utilize:

```shell
npm i -g corepack
```

Para verificar se o yarn foi instalado, execute

```shell
yarn -v
```
### Instalando Docker

* Siga as instruções no [site](https://docs.docker.com/engine/install/ubuntu/)

### Inicialização da aplicação

```shell
npx prisma generate
docker compose up
```

### Acesse as rotas em:

```shell
  http://localhost:8000/api#/
```
