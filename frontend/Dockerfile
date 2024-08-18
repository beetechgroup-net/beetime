# Fase 1: Construção
# Utilizamos uma imagem node para construir a aplicação
FROM node:18 AS builder

# Definimos o diretório de trabalho dentro do container
WORKDIR /app

# Copiamos o package.json e package-lock.json para o container
COPY package*.json ./

# Instalamos as dependências
RUN npm install

# Copiamos o restante do código para o container
COPY . .

# Construímos a aplicação
RUN npm run build

# Fase 2: Produção
# Utilizamos uma imagem node, mas podemos também usar uma imagem de servidor como nginx para servir a aplicação
FROM node:18

# Definimos o diretório de trabalho dentro do container
WORKDIR /app

# Copiamos os arquivos necessários da fase de construção
COPY --from=builder /app ./

# Instalamos apenas as dependências de produção
RUN npm install --production

# Expomos a porta onde a aplicação vai rodar
EXPOSE 3000

# Definimos o comando para iniciar a aplicação
CMD ["npm", "run", "start"]
