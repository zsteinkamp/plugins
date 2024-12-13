FROM node:23 AS dev

RUN mkdir /zip
WORKDIR /app
COPY package* .
RUN npm ci

CMD ["npm", "run", "dev"]

FROM dev AS prod
ENV NODE_ENV=production
COPY . .
RUN npm run build

CMD [ "npm", "run", "start" ]
