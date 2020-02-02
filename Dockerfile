ARG IMAGE="node:lts-alpine3.9"
FROM $IMAGE

COPY ./src /app/src
COPY ./package.json /app/package.json

WORKDIR /app

RUN cd /app && npm i

EXPOSE 8000

CMD ["npm", "start"]