(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["opensource-applications"],{5344:function(e,t,a){},"57d6":function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("vl-page",[a("vl-region",{attrs:{"mod-no-space-bottom":""}},[a("vl-layout",[a("header",{staticClass:"wp-pt-heading"},[a("div",{staticClass:"wp-pt-heading__parent"},[a("vl-link",{attrs:{to:"/","mod-bold":""}},[e._v("Overzicht")])],1),a("div",{staticClass:"wp-pt-heading__title-wrapper"},[a("vl-title",{staticClass:"wp-pt-heading__title",attrs:{"tag-name":"h1"}},[e._v("Opensource applicaties")])],1),a("vl-grid",[a("vl-column",{attrs:{width:"9","width-s":"12"}},[a("div",{staticClass:"wp-pt-heading__content"},[a("vl-typography",[a("vl-introduction",[e._v(" Welke "),a("strong",[e._v("opensource applicaties")]),e._v(" bieden wij allemaal aan? Bekijk hier het overzicht! ")])],1)],1)])],1)],1)])],1),a("vl-main",[a("vl-region",[a("vl-layout",[a("vl-grid",{attrs:{"mod-stacked":""}},[a("vl-column",{attrs:{width:"12"}},[a("vl-grid",{attrs:{"mod-stacked":""}},[e.loaded||e.error?e._e():a("vl-column",{attrs:{width:"12"}},[a("div",{directives:[{name:"vl-align",rawName:"v-vl-align:center",arg:"center"}]},[a("vl-loader",{attrs:{message:"De opensource applicaties worden opgevraagd"}})],1)]),e.error?a("vl-column",{attrs:{width:"12"}},[a("vl-alert",{attrs:{title:"Opensource applicaties ophalen mislukt",content:"Er is iets fout gelopen tijdens het ophalen van de opensource applicaties. Probeer later opnieuw.","mod-error":""}})],1):e._e(),e.loaded?a("vl-column",{attrs:{width:"12"}},[a("vl-typography",[a("p",[e._v("Momenteel beheren we "),a("strong",[e._v(e._s(e.repositories.length))]),e._v(" opensource applicaties.")]),a("p",[e._v("Deze opensource applicaties komen rechtstreeks van onze "),a("a",{attrs:{href:"https://github.com/Informatievlaanderen/"}},[e._v("GitHub pagina")]),e._v(" en zijn door hun internationale doelgroep enkel beschikbaar in het Engels.")]),a("p",[e._v("Neem een kijkje bij elke applicatie om meer te komen weten over het gebruik en de bijhorende licentie.")])]),e._l(e.repositories,(function(e){return a("repository",{key:e.id,attrs:{title:e.name,text:e.description,to:"/opensource-applicaties/"+e.name}})}))],2):e._e()],1)],1)],1)],1)],1)],1)],1)},o=[],i=(a("99af"),a("4de4"),a("86f1")),n=a("bc3a"),l=a.n(n),s=a("2ef0"),p=a.n(s),c={name:"Repositories",components:{Repository:i["a"]},data:function(){return{loaded:!1,error:!1,repositories:[]}},mounted:function(){var e=this,t={headers:{Accept:"application/vnd.github.mercy-preview+json"}};l.a.get("https://api.github.com/orgs/Informatievlaanderen/repos?type=all&sort=full_name&direction=asc&per_page=100&page=1",t).then((function(a){l.a.get("https://api.github.com/orgs/Informatievlaanderen/repos?type=all&sort=full_name&direction=asc&per_page=100&page=2",t).then((function(t){e.repositories=e.filterRepositories(a.data.concat(t.data)),e.loaded=!0})).catch((function(t){e.error=!0,console.log("Could not get repositories.",t)}))})).catch((function(t){e.error=!0,console.log("Could not get repositories.",t)}))},methods:{filterRepositories:function(e){var t=p.a.filter(e,{topics:["base-registries-application"]}),a=p.a.sortBy(t,"name");return a}}},d=c,v=a("2877"),u=Object(v["a"])(d,r,o,!1,null,null,null);t["default"]=u.exports},"7b4f":function(e,t,a){"use strict";a("5344")},cca1:function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("vl-page",[a("vl-region",{attrs:{"mod-no-space-bottom":""}},[a("vl-layout",[a("header",{staticClass:"wp-pt-heading"},[a("div",{staticClass:"wp-pt-heading__parent"},[a("vl-link",{attrs:{to:"/opensource-applicaties/","mod-bold":""}},[e._v("Opensource applicaties")])],1),a("div",{staticClass:"wp-pt-heading__title-wrapper"},[a("vl-title",{staticClass:"wp-pt-heading__title",attrs:{"tag-name":"h1"}},[e._v("Opensource applicaties")])],1),a("vl-grid",[a("vl-column",{attrs:{width:"9","width-s":"12"}},[a("div",{staticClass:"wp-pt-heading__content"},[a("vl-typography",[a("vl-introduction",[e._v(" Wat zit er zo allemaal in de opensource applicatie "),a("strong",[e._v(e._s(this.$route.params.repo))]),e._v("? ")])],1)],1)])],1)],1)])],1),a("vl-main",[a("vl-region",[a("vl-layout",[a("vl-grid",{attrs:{"mod-stacked":""}},[a("vl-column",{attrs:{width:"12"}},[a("vl-grid",{attrs:{"mod-stacked":""}},[e.loaded||e.error?e._e():a("vl-column",{attrs:{width:"12"}},[a("div",{directives:[{name:"vl-align",rawName:"v-vl-align:center",arg:"center"}]},[a("vl-loader",{attrs:{message:"De details voor de opensource applicatie worden opgevraagd"}})],1)]),e.error?a("vl-column",{attrs:{width:"12"}},[a("vl-alert",{attrs:{title:"Details opensource applicatie ophalen mislukt",content:"Er is iets fout gelopen tijdens het ophalen van de details voor de opensource applicatie. Probeer later opnieuw.","mod-error":""}})],1):e._e(),e.loaded?a("vl-column",{attrs:{id:"readme",width:"12"}},[a("vl-typography",[a("h1",[e._v("Informatie")]),a("p",[e._v("Aangemaakt op "+e._s(e.getDateString(e.created))+", laatst gewijzigd op "+e._s(e.getDateString(e.pushed))+".")]),a("p",[e._v("De code is te vinden op "),a("vl-link",{attrs:{href:e.repoUrl}},[e._v(e._s(e.repoUrl))]),e._v(".")],1),a("p",[e._v("Deze opensource applicatie is beschikbaar onder de volgende licentie: "),a("vl-link",{attrs:{href:e.licenseUrl}},[e._v(e._s(e.license))]),e._v(".")],1),a("vue-markdown",{attrs:{source:e.readme,breaks:!1}})],1)],1):e._e()],1)],1)],1)],1)],1)],1)],1)},o=[],i=(a("a4d3"),a("e01a"),a("99af"),a("fb6a"),a("b0c0"),a("bc3a")),n=a.n(i),l={name:"RepositoryDetail",data:function(){return{loaded:!1,error:!1,readme:"",description:"",license:"",licenseUrl:""}},mounted:function(){var e=this;n.a.get("https://api.github.com/repos/Informatievlaanderen/"+this.$route.params.repo).then((function(t){e.description=t.data.description,e.license=t.data.license.name,e.licenseUrl=t.data.license.url,e.repoName=t.data.name,e.repoUrl=t.data.html_url,e.created=new Date(t.data.created_at),e.pushed=new Date(t.data.pushed_at),n.a.get("https://raw.githubusercontent.com/Informatievlaanderen/"+e.repoName+"/main/README.md").then((function(t){e.readme=t.data,e.loaded=!0})).catch((function(t){e.error=!0,console.log("Could not get repository readme.",t)}))})).catch((function(t){e.error=!0,console.log("Could not get repository.",t)}))},methods:{getDateString:function(e){return"".concat(e.getFullYear(),"-").concat(("0"+e.getMonth()).slice(-2),"-").concat(("0"+e.getDate()).slice(-2))}}},s=l,p=(a("7b4f"),a("2877")),c=Object(p["a"])(s,r,o,!1,null,null,null);t["default"]=c.exports}}]);
//# sourceMappingURL=opensource-applications-legacy.c72274d1.js.map