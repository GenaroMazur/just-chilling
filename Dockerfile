#Fase de construccion
FROM node:24 AS build_stage

WORKDIR /usr/app/

COPY --chown=node:node package.json yarn.lock ./
RUN node install

COPY --chown=node:node . .

RUN node build

# Fase de produccion
FROM node:24-alpine AS production_stage

USER node
WORKDIR /usr/app/

COPY --chown=node:node package.json .
COPY --from=build_stage --chown=node:node /usr/app/dist /usr/app/dist
COPY --chown=node:node VERSION /usr/app/VERSION

RUN npm ci --omit=dev

ENV TCP_PORT=8080
EXPOSE 8080

CMD node /usr/app/dist/index