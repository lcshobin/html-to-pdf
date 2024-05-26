#for dev
FROM ghcr.io/puppeteer/puppeteer:22.9.0 AS build

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable
WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

#for prod
FROM ghcr.io/puppeteer/puppeteer:22.9.0 AS production

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable
WORKDIR /app

COPY package*.json .

RUN npm ci --only=production

COPY --from=build /app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/index.js"]







