import Vue from "vue";
import Router, { RawLocation, Route, RouteConfig } from "vue-router";
import { HomeRoutes } from "./modules/home/";
import { DocumentationRoutes } from "./modules/documentation/";
import { ImplementationModelRoutes } from "./modules/implementation-model/";
import { InformationRoutes } from "./modules/information/";
import { GeneralRoutes } from "./modules/general/";
import { MotiveRoutes } from "./modules/motive/";
import { VisionRoutes } from "./modules/vision";
import { RegistryRoutes } from "./modules/registries";
import { StatusRoutes } from "./modules/status";
import { ReleaseNotesRoutes } from "./modules/release-notes";
import { ErrorDetailRoutes } from "./modules/error-detail";
import { VersionRoutes } from "./modules/versions";
import { FaqRoutes } from "./modules/faq";
import { OpensourceApplicationsRoutes } from "./modules/opensource-applications";
import { OpensourceComponentsRoutes } from "./modules/opensource-components";
import { IntegrationDocumentationRoutes } from "./modules/integration-documentation" ; 

Vue.use(Router);

const routes: RouteConfig[] = [
    ...HomeRoutes,
    ...DocumentationRoutes,
    ...ImplementationModelRoutes,
    ...InformationRoutes,
    ...GeneralRoutes,
    ...MotiveRoutes,
    ...VisionRoutes,
    ...RegistryRoutes,
    ...ErrorDetailRoutes,
    ...StatusRoutes,
    ...ReleaseNotesRoutes,
    ...VersionRoutes,
    ...IntegrationDocumentationRoutes,
    ...FaqRoutes,
    ...OpensourceApplicationsRoutes,
    ...OpensourceComponentsRoutes
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
