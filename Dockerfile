FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json .

COPY prisma ./prisma

COPY public ./public

RUN npm install && npm cache clean --force

COPY tsconfig.json ./           

COPY src ./src

# COPY public ./public

COPY . .

RUN npx prisma generate

CMD ["npm", "run", "start:dev"]


