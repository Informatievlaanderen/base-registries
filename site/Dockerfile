FROM node:18.15.0-alpine as build-stage
LABEL maintainer "Digitaal Vlaanderen <digitaal.vlaanderen@vlaanderen.be>"
ARG NPM_TOKEN
WORKDIR /app
COPY . /app
RUN npm i --loglevel verbose
RUN npm run build --loglevel verbose

FROM nginx:1.23.3-alpine-perl as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html

RUN rm -rf /etc/nginx/conf.d/*.conf
COPY nginx.conf.template /etc/nginx/conf.d/basisregisters.vlaanderen.conf.template

COPY init.sh ./init.sh
RUN chmod +x ./init.sh && dos2unix ./init.sh

EXPOSE 80

ENTRYPOINT ["./init.sh"]
