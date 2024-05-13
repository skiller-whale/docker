FROM node:18.13

WORKDIR /usr/src/postprocess

COPY package*.json ./

RUN npm install

COPY . .

ENTRYPOINT ["node"]
CMD ["src/postprocess.js"]
