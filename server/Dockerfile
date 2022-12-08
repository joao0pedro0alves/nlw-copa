FROM node:14 AS builder

ARG PACKAGES="sqlite3"

# Install packages
RUN apt-get update && apt-get install -y --no-install-recommends $PACKAGES

# Change our working directory, so that the following commands will be run in the context of this location.
WORKDIR /nlw_copa_backend

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
COPY prisma ./prisma/

# Install app dependencies
RUN npm install

COPY . .

RUN npm run build
ENV NODE_ENV production

FROM node:14

COPY --from=builder /nlw_copa_backend/node_modules ./node_modules
COPY --from=builder /nlw_copa_backend/package*.json ./
COPY --from=builder /nlw_copa_backend/dist ./dist

EXPOSE 3333
CMD [ "npm", "run", "preview" ]