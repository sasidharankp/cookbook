FROM node:12.19-alpine

WORKDIR /usr/src/app

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

ENV ANCESTREE_DEV_DB_HOST = ""
ENV ANCESTREE_DEV_DB_USERNAME = ""
ENV ANCESTREE_DEV_DB_PASSWORD = ""

COPY package.json /usr/src/app/
RUN npm install

COPY . /usr/src/app

ENV PORT 5000
EXPOSE $PORT
CMD [ "npm", "start" ]
