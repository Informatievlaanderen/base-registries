import Vue from "vue";
import Router, { RawLocation, Route, RouteConfig } from "vue-router";
import { HomeRoutes } from "./modules/home/";
import { DocumentationRoutes } from "./modules/documentation/";
import { ApiKeyRoutes } from "./modules/apikey/";
import { ImplementationModelRoutes } from "./modules/implementation-model/";
import { RegistryRoutes } from "./modules/registries";
import { StatusRoutes } from "./modules/status";
import { ReleaseNotesRoutes } from "./modules/release-notes";
import { ErrorDetailRoutes } from "./modules/error-detail";
import { VersionRoutes } from "./modules/versions";
import { FaqRoutes } from "./modules/faq";
import { GlossaryRoutes } from "./modules/glossary";
import { OpensourceApplicationsRoutes } from "./modules/opensource-applications";
import { OpensourceComponentsRoutes } from "./modules/opensource-components";
import { IntegrationDocumentationRoutes } from "./modules/integration-documentation" ; 
import { ProductsRoutes } from "./modules/products" ; 

Vue.use(Router);

const routes: RouteConfig[] = [
    ...HomeRoutes,
    ...DocumentationRoutes,
    ...ApiKeyRoutes,
    ...ImplementationModelRoutes,
    ...RegistryRoutes,
    ...ErrorDetailRoutes,
    ...StatusRoutes,
    ...ReleaseNotesRoutes,
    ...VersionRoutes,
    ...IntegrationDocumentationRoutes,
    ...FaqRoutes,
    ...GlossaryRoutes,
    ...OpensourceApplicationsRoutes,
    ...OpensourceComponentsRoutes,
    ...ProductsRoutes
];

function ensureRouteMetaValue(route: Route, predicate: (meta: any) => boolean) {
    return route.matched.some(m => predicate(m.meta));
}

routes.push({
    path: "*",
    redirect: "/",
});

export const router = new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;
