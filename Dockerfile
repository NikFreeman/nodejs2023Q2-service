FROM node:20.11.1-alpine3.19 as build
WORKDIR /app

COPY package.json.docker ./package.json
COPY prisma ./prisma/

RUN npm install
COPY . .

RUN npm run prisma:generate
RUN npm run build

RUN npm cache clean --force  && rm -rf /etc/apk/cache

FROM node:20.11.1-alpine3.19 as dev
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/src ./src
COPY --from=build /app/*.*  ./
CMD ["npm", "run", "docker:dev"]
EXPOSE ${PORT}