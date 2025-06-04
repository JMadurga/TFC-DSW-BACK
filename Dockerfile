FROM node:18

# Instalar netcat para esperar la base de datos
RUN apt-get update && apt-get install -y netcat-openbsd && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Script que espera a que MSSQL esté disponible
COPY wait-for-mssql.sh /app/wait-for-mssql.sh
RUN chmod +x /app/wait-for-mssql.sh

EXPOSE 3300

CMD ["sh", "-c", "./wait-for-mssql.sh && npx sequelize-cli db:migrate && npx sequelize-cli db:seed:all && node src/app.js"]
