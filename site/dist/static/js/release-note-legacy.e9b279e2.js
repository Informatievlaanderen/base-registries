(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["release-note"],{"02f4":function(t,e,r){var n=r("4588"),o=r("be13");t.exports=function(t){return function(e,r){var a,c,i=String(o(e)),l=n(r),u=i.length;return l<0||l>=u?t?"":void 0:(a=i.charCodeAt(l),a<55296||a>56319||l+1===u||(c=i.charCodeAt(l+1))<56320||c>57343?t?i.charAt(l):a:t?i.slice(l,l+2):c-56320+(a-55296<<10)+65536)}}},"0390":function(t,e,r){"use strict";var n=r("02f4")(!0);t.exports=function(t,e,r){return e+(r?n(t,e).length:1)}},"0bfb":function(t,e,r){"use strict";var n=r("cb7c");t.exports=function(){var t=n(this),e="";return t.global&&(e+="g"),t.ignoreCase&&(e+="i"),t.multiline&&(e+="m"),t.unicode&&(e+="u"),t.sticky&&(e+="y"),e}},"11e9":function(t,e,r){var n=r("52a7"),o=r("4630"),a=r("6821"),c=r("6a99"),i=r("69a8"),l=r("c69a"),u=Object.getOwnPropertyDescriptor;e.f=r("9e1e")?u:function(t,e){if(t=a(t),e=c(e,!0),l)try{return u(t,e)}catch(r){}if(i(t,e))return o(!n.f.call(t,e),t[e])}},"214f":function(t,e,r){"use strict";r("b0c5");var n=r("2aba"),o=r("32e9"),a=r("79e5"),c=r("be13"),i=r("2b4c"),l=r("520a"),u=i("species"),s=!a((function(){var t=/./;return t.exec=function(){var t=[];return t.groups={a:"7"},t},"7"!=="".replace(t,"$<a>")})),f=function(){var t=/(?:)/,e=t.exec;t.exec=function(){return e.apply(this,arguments)};var r="ab".split(t);return 2===r.length&&"a"===r[0]&&"b"===r[1]}();t.exports=function(t,e,r){var p=i(t),v=!a((function(){var e={};return e[p]=function(){return 7},7!=""[t](e)})),d=v?!a((function(){var e=!1,r=/a/;return r.exec=function(){return e=!0,null},"split"===t&&(r.constructor={},r.constructor[u]=function(){return r}),r[p](""),!e})):void 0;if(!v||!d||"replace"===t&&!s||"split"===t&&!f){var g=/./[p],h=r(c,p,""[t],(function(t,e,r,n,o){return e.exec===l?v&&!o?{done:!0,value:g.call(e,r,n)}:{done:!0,value:t.call(r,e,n)}:{done:!1}})),b=h[0],x=h[1];n(String.prototype,t,b),o(RegExp.prototype,p,2==e?function(t,e){return x.call(t,this,e)}:function(t){return x.call(t,this)})}}},"3b2b":function(t,e,r){var n=r("7726"),o=r("5dbc"),a=r("86cc").f,c=r("9093").f,i=r("aae3"),l=r("0bfb"),u=n.RegExp,s=u,f=u.prototype,p=/a/g,v=/a/g,d=new u(p)!==p;if(r("9e1e")&&(!d||r("79e5")((function(){return v[r("2b4c")("match")]=!1,u(p)!=p||u(v)==v||"/a/i"!=u(p,"i")})))){u=function(t,e){var r=this instanceof u,n=i(t),a=void 0===e;return!r&&n&&t.constructor===u&&a?t:o(d?new s(n&&!a?t.source:t,e):s((n=t instanceof u)?t.source:t,n&&a?l.call(t):e),r?this:f,u)};for(var g=function(t){t in u||a(u,t,{configurable:!0,get:function(){return s[t]},set:function(e){s[t]=e}})},h=c(s),b=0;h.length>b;)g(h[b++]);f.constructor=u,u.prototype=f,r("2aba")(n,"RegExp",u)}r("7a56")("RegExp")},"520a":function(t,e,r){"use strict";var n=r("0bfb"),o=RegExp.prototype.exec,a=String.prototype.replace,c=o,i="lastIndex",l=function(){var t=/a/,e=/b*/g;return o.call(t,"a"),o.call(e,"a"),0!==t[i]||0!==e[i]}(),u=void 0!==/()??/.exec("")[1],s=l||u;s&&(c=function(t){var e,r,c,s,f=this;return u&&(r=new RegExp("^"+f.source+"$(?!\\s)",n.call(f))),l&&(e=f[i]),c=o.call(f,t),l&&c&&(f[i]=f.global?c.index+c[0].length:e),u&&c&&c.length>1&&a.call(c[0],r,(function(){for(s=1;s<arguments.length-2;s++)void 0===arguments[s]&&(c[s]=void 0)})),c}),t.exports=c},"5dbc":function(t,e,r){var n=r("d3f4"),o=r("8b97").set;t.exports=function(t,e,r){var a,c=e.constructor;return c!==r&&"function"==typeof c&&(a=c.prototype)!==r.prototype&&n(a)&&o&&o(t,a),t}},"5f1b":function(t,e,r){"use strict";var n=r("23c6"),o=RegExp.prototype.exec;t.exports=function(t,e){var r=t.exec;if("function"===typeof r){var a=r.call(t,e);if("object"!==typeof a)throw new TypeError("RegExp exec method returned something other than an Object or null");return a}if("RegExp"!==n(t))throw new TypeError("RegExp#exec called on incompatible receiver");return o.call(t,e)}},"7e0c":function(t,e,r){"use strict";var n=r("b4ed"),o=r.n(n);o.a},"8b718":function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("vl-page",[r("vl-region",{attrs:{"mod-no-space-bottom":""}},[r("vl-layout",[r("header",{staticClass:"wp-pt-heading"},[r("div",{staticClass:"wp-pt-heading__parent"},[r("vl-link",{attrs:{to:"/release-notes/","mod-bold":""}},[t._v("Release notes")])],1),r("div",{staticClass:"wp-pt-heading__title-wrapper"},[r("vl-title",{staticClass:"wp-pt-heading__title",attrs:{"tag-name":"h1"}},[t._v("Release notes")])],1),r("vl-grid",[r("vl-column",{attrs:{width:"9","width-s":"12"}},[r("div",{staticClass:"wp-pt-heading__content"},[r("vl-typography",[r("vl-introduction",[t._v("\n                  Wat zit er zo allemaal in een "),r("strong",[t._v("release")]),t._v("? Kom het hier te weten!\n                ")])],1)],1)])],1)],1)])],1),r("vl-main",[r("vl-region",[r("vl-layout",[r("vl-grid",{attrs:{"mod-stacked":""}},[r("vl-column",{attrs:{width:"12"}},[r("vl-grid",{attrs:{"mod-stacked":""}},[t.loaded||t.error?t._e():r("vl-column",{attrs:{width:"12"}},[r("div",{directives:[{name:"vl-align",rawName:"v-vl-align:center",arg:"center"}]},[r("vl-loader",{attrs:{message:"De release notes worden opgevraagd"}})],1)]),t.error?r("vl-column",{attrs:{width:"12"}},[r("vl-alert",{attrs:{title:"Release notes ophalen mislukt",content:"Er is iets fout gelopen tijdens het ophalen van de release notes. Probeer later opnieuw.","mod-error":""}})],1):t._e(),t.loaded?r("vl-column",{attrs:{id:"release-notes",width:"12"}},[r("vl-typography",[r("vue-markdown",{attrs:{source:t.notes,breaks:!1}})],1)],1):t._e()],1)],1)],1)],1)],1)],1)],1)},o=[],a=(r("3b2b"),r("a481"),r("bc3a")),c=r.n(a);function i(t,e,r,n){return t.replace(new RegExp(e.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,"\\$&"),n?"gi":"g"),"string"==typeof r?r.replace(/\$/g,"$$$$"):r)}var l={name:"notes",data:function(){return{loaded:!1,error:!1,notes:""}},mounted:function(){var t=this;c.a.get("https://raw.githubusercontent.com/wiki/Informatievlaanderen/registry-documentation/"+this.$route.params.note+".md").then((function(e){t.notes=i(e.data,"https://github.com/Informatievlaanderen/registry-documentation/wiki/","/release-notes/"),t.loaded=!0})).catch((function(e){t.error=!0,console.log("Could not get release notes.",e)}))}},u=l,s=(r("7e0c"),r("2877")),f=Object(s["a"])(u,n,o,!1,null,null,null);e["default"]=f.exports},"8b97":function(t,e,r){var n=r("d3f4"),o=r("cb7c"),a=function(t,e){if(o(t),!n(e)&&null!==e)throw TypeError(e+": can't set as prototype!")};t.exports={set:Object.setPrototypeOf||("__proto__"in{}?function(t,e,n){try{n=r("9b43")(Function.call,r("11e9").f(Object.prototype,"__proto__").set,2),n(t,[]),e=!(t instanceof Array)}catch(o){e=!0}return function(t,r){return a(t,r),e?t.__proto__=r:n(t,r),t}}({},!1):void 0),check:a}},9093:function(t,e,r){var n=r("ce10"),o=r("e11e").concat("length","prototype");e.f=Object.getOwnPropertyNames||function(t){return n(t,o)}},a481:function(t,e,r){"use strict";var n=r("cb7c"),o=r("4bf8"),a=r("9def"),c=r("4588"),i=r("0390"),l=r("5f1b"),u=Math.max,s=Math.min,f=Math.floor,p=/\$([$&`']|\d\d?|<[^>]*>)/g,v=/\$([$&`']|\d\d?)/g,d=function(t){return void 0===t?t:String(t)};r("214f")("replace",2,(function(t,e,r,g){return[function(n,o){var a=t(this),c=void 0==n?void 0:n[e];return void 0!==c?c.call(n,a,o):r.call(String(a),n,o)},function(t,e){var o=g(r,t,this,e);if(o.done)return o.value;var f=n(t),p=String(this),v="function"===typeof e;v||(e=String(e));var b=f.global;if(b){var x=f.unicode;f.lastIndex=0}var m=[];while(1){var w=l(f,p);if(null===w)break;if(m.push(w),!b)break;var y=String(w[0]);""===y&&(f.lastIndex=i(p,a(f.lastIndex),x))}for(var _="",E=0,$=0;$<m.length;$++){w=m[$];for(var R=String(w[0]),k=u(s(c(w.index),p.length),0),S=[],C=1;C<w.length;C++)S.push(d(w[C]));var O=w.groups;if(v){var j=[R].concat(S,k,p);void 0!==O&&j.push(O);var A=String(e.apply(void 0,j))}else A=h(R,p,k,S,O,e);k>=E&&(_+=p.slice(E,k)+A,E=k+R.length)}return _+p.slice(E)}];function h(t,e,n,a,c,i){var l=n+t.length,u=a.length,s=v;return void 0!==c&&(c=o(c),s=p),r.call(i,s,(function(r,o){var i;switch(o.charAt(0)){case"$":return"$";case"&":return t;case"`":return e.slice(0,n);case"'":return e.slice(l);case"<":i=c[o.slice(1,-1)];break;default:var s=+o;if(0===s)return r;if(s>u){var p=f(s/10);return 0===p?r:p<=u?void 0===a[p-1]?o.charAt(1):a[p-1]+o.charAt(1):r}i=a[s-1]}return void 0===i?"":i}))}}))},aae3:function(t,e,r){var n=r("d3f4"),o=r("2d95"),a=r("2b4c")("match");t.exports=function(t){var e;return n(t)&&(void 0!==(e=t[a])?!!e:"RegExp"==o(t))}},b0c5:function(t,e,r){"use strict";var n=r("520a");r("5ca1")({target:"RegExp",proto:!0,forced:n!==/./.exec},{exec:n})},b4ed:function(t,e,r){}}]);
//# sourceMappingURL=release-note-legacy.e9b279e2.js.map