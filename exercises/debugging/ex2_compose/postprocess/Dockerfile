FROM node:18.13

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --prefix ./

COPY . .

ENTRYPOINT [ "node" ]
CMD ["postprocess.js"]
