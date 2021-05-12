FROM node:14.16.0-stretch

WORKDIR /node/app

COPY frontend/package.json /node/app

RUN npm install

COPY frontend/ /node/app

EXPOSE 3000

CMD ["npm", "start"]