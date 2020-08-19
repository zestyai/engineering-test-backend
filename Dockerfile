FROM node:12-alpine

RUN mkdir /home/node/app/ && chown -R node:node /home/node/app
WORKDIR /home/node/app

USER node

COPY --chown=node:node package.json yarn.lock ./
RUN yarn install

COPY --chown=node:node ./ ./
RUN cd backend/ && yarn build

EXPOSE 3030
CMD node backend/src/index.js