FROM nginx:1.17.3-alpine-perl

COPY dist /usr/share/nginx/html

RUN rm -rf /etc/nginx/conf.d/*.conf

COPY nginx.conf /etc/nginx/conf.d/basisregisters.vlaanderen.conf

CMD ["nginx", "-g", "daemon off; load_module /etc/nginx/modules/ngx_http_perl_module-debug.so;"]
