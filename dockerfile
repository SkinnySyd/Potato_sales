## Stage 1: Build the angular application
FROM node:alpine as build
 

WORKDIR /app
 
# package.json as well as the package-lock.json
COPY package*.json ./

RUN npm install
 
COPY . .
 
ARG configuration=production
 
RUN npm run build -outputPath=/app/dist/ --configuration=$configuration
 
#### Stage 2 : usign the compiled app with nginx 
FROM nginx:alpine
 
# angular build from Stage 1
COPY --from=build /app/dist/potato-sales-app/ /usr/share/nginx/html
 
#custom nginx config
COPY /nginx-custom.conf /etc/nginx/conf.d/default.conf
 

EXPOSE 80
 
ENTRYPOINT ["nginx","-g","daemon off;"]