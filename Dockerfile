FROM node:23-alpine

USER node
RUN mkdir -p /home/node/app
WORKDIR /home/node/app

COPY --chown=node:node package*.json .
RUN npm install
COPY --exclude=node_modules --chown=node:node  . .

EXPOSE 3000
CMD [ "npm", "run", "start:prod" ]
