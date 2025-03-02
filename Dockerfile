FROM node:22.13.0

WORKDIR /user/src/app

COPY package*.json ./

RUN npm ci

COPY . ./

ENTRYPOINT [ "npm", "run", "start" ]