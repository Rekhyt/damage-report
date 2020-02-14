ARG IMAGE="node:lts-alpine3.9"
FROM $IMAGE

RUN apk add --no-cache python3 make gcc

COPY ./src /app/src
COPY ./package.json /app/package.json

WORKDIR /app

RUN cd /app && npm i && rm -rf /tmp/* /root/.npm /root/.node-gyp

EXPOSE 8000

CMD ["npm", "start"]