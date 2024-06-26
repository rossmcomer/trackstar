FROM node:20 AS build-stage
WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

ENV REACT_APP_BACKEND_URL=http://3.149.247.65

RUN npm run build

FROM nginx:stable-alpine3.19-perl
COPY --from=build-stage /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

CMD ["nginx", "-g", "daemon off;"]