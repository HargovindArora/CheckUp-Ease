FROM node:14.16.0-stretch

WORKDIR /node/app

COPY package.json /node/app

RUN npm install

COPY . /node/app

EXPOSE 3000

CMD ["npm", "start"]