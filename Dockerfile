FROM node:23 AS dev

RUN mkdir /zip
WORKDIR /app
COPY package* .
RUN npm ci

CMD ["npm", "run", "dev"]

FROM dev AS prod
ENV NODE_ENV=production
ARG GIT_SHA=unknown
ARG BUILD_TIME=unknown
ENV GIT_SHA=$GIT_SHA
ENV BUILD_TIME=$BUILD_TIME
COPY . .
RUN npm run build

CMD [ "npm", "run", "start" ]
