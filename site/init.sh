#!/bin/sh

echo "window.baseRegistriesVersion=\"$API_VERSION\";" >> /usr/share/nginx/html/config.js
echo "window.baseRegistriesApi=\"$API_ENDPOINT\";" >> /usr/share/nginx/html/config.js

sed -i "s/REPLACE_ALIAS_ZONE_NAME/$ALIAS_ZONE_NAME/g" /etc/nginx/conf.d/basisregisters.vlaanderen.conf

echo $SITE_VERSION > /usr/share/nginx/html/VERSION

nginx -g 'daemon off; load_module /etc/nginx/modules/ngx_http_perl_module-debug.so;'
