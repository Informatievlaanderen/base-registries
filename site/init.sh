#!/bin/sh


export DOLLAR='$';
echo "" > /usr/share/nginx/html/env.js
echo "window.baseRegistriesVersion=\"$SITE_VERSION\";" >> /usr/share/nginx/html/env.js
echo "window.baseRegistriesApiVersion=\"$API_VERSION\";" >> /usr/share/nginx/html/env.js
echo "window.baseRegistriesApi=\"$API_ENDPOINT\";" >> /usr/share/nginx/html/env.js
echo "window.baseRegistriesBranchContent=\"$REPLACE_ALIAS_BRANCH_CONTENT\";" >> /usr/share/nginx/html/env.js
echo $SITE_VERSION > /usr/share/nginx/html/VERSION
envsubst < /etc/nginx/conf.d/basisregisters.vlaanderen.conf.template > /etc/nginx/conf.d/basisregisters.vlaanderen.conf

nginx -g 'daemon off; load_module /etc/nginx/modules/ngx_http_perl_module-debug.so;'
