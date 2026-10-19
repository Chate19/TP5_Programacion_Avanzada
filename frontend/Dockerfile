FROM node:18-alpine

WORKDIR /app

# Copiamos los archivos de dependencias primero
COPY package*.json ./
RUN npm install

# Copiamos el resto del código
COPY . .

# Exponemos el puerto de Vite
EXPOSE 5173

# Arrancamos Vite permitiendo conexiones externas (--host)
CMD ["npm", "run", "dev", "--", "--host"]