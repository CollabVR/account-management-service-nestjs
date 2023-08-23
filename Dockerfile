FROM node:20-alpine AS build

WORKDIR /usr/src/app

COPY package*.json ./
COPY prisma ./prisma/
RUN npm install 
RUN npx prisma generate

COPY . .
RUN npm run build



#PROD STAGE

FROM node:20-alpine 

WORKDIR /usr/src/app

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

COPY --from=build /usr/src/app/dist ./dist

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install  --only=production
RUN npx prisma generate

RUN rm package*.json

EXPOSE 3000

CMD ["node", "dist/main.js"]
