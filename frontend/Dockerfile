FROM node:alpine as builder

WORKDIR app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build
RUN npm run build:ssr

FROM node:alpine
WORKDIR /app
COPY --from=builder /app/dist /app/dist
CMD ["node", "/app/dist/frontend/server/main.js"]
