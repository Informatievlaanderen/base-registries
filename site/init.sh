#!/bin/sh

echo "window.baseRegistriesVersion=\"$API_VERSION\";" >> /usr/share/nginx/html/config.js

nginx -g 'daemon off; load_module /etc/nginx/modules/ngx_http_perl_module-debug.so;'
