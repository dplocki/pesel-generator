FROM node:20.3.0-slim AS build

WORKDIR /build

EXPOSE 3000

COPY package.json package.json
COPY package-lock.json package-lock.json

COPY public/ /build/public/
COPY src/ /build/src

RUN npm ci
RUN npm run build

CMD [ "npm", "run", "start" ]
