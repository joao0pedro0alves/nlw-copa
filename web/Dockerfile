FROM node:lts as dependencies

WORKDIR /nlw_copa_frontend
COPY package.json package-lock.json ./
RUN npm install

FROM node:lts as builder
WORKDIR /nlw_copa_frontend
COPY . .
COPY --from=dependencies /nlw_copa_frontend/node_modules ./node_modules
RUN npm run build

FROM node:lts as runner
WORKDIR /nlw_copa_frontend
ENV NODE_ENV production

# If you are using a custom next.config.js file, uncomment this line.
# COPY --from=builder /my-project/next.config.js ./
COPY --from=builder /nlw_copa_frontend/public ./public
COPY --from=builder /nlw_copa_frontend/.next ./.next
COPY --from=builder /nlw_copa_frontend/node_modules ./node_modules
COPY --from=builder /nlw_copa_frontend/package.json ./package.json

EXPOSE 3003
CMD ["npm", "run", "start"]