FROM node:12-slim

RUN mkdir /home/node/app/ && chown -R node:node /home/node/app
WORKDIR /home/node/app

# Use non-root user
USER node

# Start by installing dependencies first to leverage Docker layer caching
COPY --chown=node:node package.json yarn.lock backend/package.json ./
RUN yarn install

COPY --chown=node:node ./ ./
RUN yarn --cwd backend/ build

EXPOSE 3030
CMD node backend/src/index.js
