FROM nginx:1.17.3-alpine-perl

LABEL maintainer "agentschap Informatie Vlaanderen <informatie.vlaanderen@vlaanderen.be>"

COPY dist /usr/share/nginx/html

RUN rm -rf /etc/nginx/conf.d/*.conf
COPY nginx.conf /etc/nginx/conf.d/basisregisters.vlaanderen.conf

COPY init.sh ./init.sh
RUN chmod +x ./init.sh && dos2unix ./init.sh

ENTRYPOINT ["./init.sh"]
