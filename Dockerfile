# Imagen base
FROM node:18

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos del proyecto
COPY package*.json ./
COPY . .

# Instala las dependencias
RUN npm install

# Expone el puerto (debe coincidir con tu .env.prod o .env.dev)
EXPOSE 3000

# Comando por defecto
CMD ["npm", "start"]
