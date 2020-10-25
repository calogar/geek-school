FROM node:12-alpine
WORKDIR /usr/src/app
RUN apk update && apk add bash

COPY package.json .
RUN npm install

EXPOSE 3000

#CMD ["npm", "start"]

CMD /wait-for-it.sh db:3306 -- npm start

COPY . .
