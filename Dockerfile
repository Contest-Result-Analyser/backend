FROM node:23

USER node
RUN mkdir -p /home/node/app
WORKDIR /home/node/app

COPY --chown=node:node package*.json .
RUN npm install
COPY --chown=node:node  . .
RUN chmod +x ./entrypoint.sh

EXPOSE 3000
ENTRYPOINT [ "./entrypoint.sh" ]
CMD [ "prod" ]
