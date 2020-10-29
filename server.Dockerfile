FROM node:11

ENV NODE_ENV=production

COPY src /usr/app/src/
COPY package.json /usr/app/
COPY ecosystem.config.js /usr/app/

WORKDIR /usr/app/

RUN yarn
RUN yarn global add pm2

EXPOSE 3000

CMD ["pm2-runtime", "ecosystem.config.js"]
