FROM nginx:1.17.10-alpine-perl as production-stage
COPY dist /usr/share/nginx/html

RUN rm -rf /etc/nginx/conf.d/*.conf
COPY nginx.conf.template /etc/nginx/conf.d/basisregisters.vlaanderen.conf.template

COPY init.sh ./init.sh
RUN chmod +x ./init.sh && dos2unix ./init.sh

EXPOSE 80

ENTRYPOINT ["./init.sh"]
