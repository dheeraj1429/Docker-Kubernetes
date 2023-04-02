FROM node

WORKDIR /app

COPY package.json .

RUN npm instal

COPY . .

EXPOSE 3000

CMD [ "node", "app.js" ]