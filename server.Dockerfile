FROM node:11

COPY ./ /

RUN yarn

CMD ["yarn", "start"]
