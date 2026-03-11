FROM node:22

WORKDIR /EcomFrontend

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm","run","dev","--","--host"]