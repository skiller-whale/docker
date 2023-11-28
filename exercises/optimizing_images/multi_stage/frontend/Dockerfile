FROM nginx:1.25-alpine

RUN apk add --no-cache nodejs npm

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

RUN npm run build
RUN cp -r /app/build/* /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
