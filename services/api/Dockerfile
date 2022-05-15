FROM node:17.8.0

COPY . /app
WORKDIR /app

RUN npm i
RUN npm i -g ts-node typescript @types/node

CMD npm start