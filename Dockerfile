FROM node:18.14.2-alpine as build-env
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Serveur nginx pour faire tourner l'app
FROM nginx:alpine
COPY --from=build-env /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80