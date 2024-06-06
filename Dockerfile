FROM node:16.18.1-bullseye-slim
ENV NODE_ENV production
WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN yarn

RUN NODE_OPTIONS=--max-old-space-size=4096 yarn build

USER node

# Running the app
CMD [ "yarn", "generate-graphql"]
CMD [ "yarn", "start", "--hostname", "0.0.0.0" ]
