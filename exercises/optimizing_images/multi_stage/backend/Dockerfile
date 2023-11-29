FROM node:20.8.1

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

ENV BACKEND_DAO="memory"
ENV BACKEND_HOST, BACKEND_PORT

# CMD needs to be used here to support both:
#   node src/server.js
#   npm run test
# CMD ["node", "src/server.js"]

# ALternatively you can do this:
#   node src/server.js
#   node --test tests/*
ENTRYPOINT [ "node" ]
CMD ["src/server.js"]
