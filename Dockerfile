# ---------- Base ----------
FROM node:18 as base
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

FROM base as builder
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
RUN npm prune --production 

FROM base as release
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist
RUN chown -R node:node /usr/src/app
RUN chmod 755 /usr/src/app
USER node
CMD ["npm", "run", "start"]