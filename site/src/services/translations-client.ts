import apiClient from "./api-client";

const cacheGithubApiReposResponse = [] as any[];
// avoiding caching entirely won't work since we cannot bypass github minumum 5 minute caching
export const TranslationClient = {
    getTranslations: async (lang: string): Promise<any> => {
        const path = `/assets/locales/${lang}.json`;
        return (await apiClient.get<string>(path, undefined, { 'Cache-Control': 'no-store' })).data;
    },
    getPageMarkdownContent: async (lang: string, page: string): Promise<string> => {
        const path = `/assets/locales/${lang}/${page}/content.md`;
        return (await apiClient.get<string>(path, undefined, { 'Cache-Control': 'no-store' })).data;
    },
    getPageMarkdownHeader: async (lang: string, page: string): Promise<string> => {
        const path = `/assets/locales/${lang}/${page}/header.md`;
        return (await apiClient.get<string>(path, undefined, { 'Cache-Control': 'no-store' })).data;
    },
    getMarkdownReleaseNotes: async (): Promise<string> => {
        const path = `/wiki/Informatievlaanderen/registry-documentation/Release-Notes.md`;
        return (await apiClient.get<string>(path, undefined, { 'Cache-Control': 'no-store' })).data;
    },
    getFaqTableOfContents: async (lang: string): Promise<Faq.TableOfContents> => {
        const path = `/assets/locales/${lang}/faq/table-of-contents.json`;
        return (await apiClient.get<Faq.TableOfContents>(path, undefined, { 'Cache-Control': 'no-store' })).data;
    },
    getAccordion: async (lang: string, folder: string): Promise<Faq.Accordion> => {
        const path = `/assets/locales/${lang}/${folder}/accordion.json`;
        return (await apiClient.get<Faq.Accordion>(path, undefined, { 'Cache-Control': 'no-store' })).data;
    },
    getErrorDetailTableOfContents: async (lang: string): Promise<ErrorDetail.TableOfContents> => {
        const path = `/assets/locales/${lang}/error-detail/table-of-contents.json`;
        return (await apiClient.get<ErrorDetail.TableOfContents>(path, undefined, { 'Cache-Control': 'no-store' })).data;
    },
    getErrorDetailKnownErrorMarkdown: async (lang: string, knownErrorId: string): Promise<string> => {
        const path = `/assets/locales/${lang}/error-detail/known-errors/${knownErrorId}.md`;
        return (await apiClient.get<string>(path, undefined, { 'Cache-Control': 'no-store' })).data;
    },
    getErrorDetailKnownErrorExample: async (lang: string, knownErrorId: string): Promise<string> => {
        const path = `/assets/locales/${lang}/error-detail/known-errors/${knownErrorId}.json`;
        return (await apiClient.get<string>(path, undefined, { 'Cache-Control': 'no-store' })).data;
    },
    getImplementationModelMarkdown: async (register: ImplementationModelType, versionDate: String) => {
        const path = `/assets/oslo/doc/implementatiemodel/${register}/ontwerpstandaard/${versionDate}/index_nl.html`;
        return (await apiClient.get<string>(path, undefined, { "Content-Type": "text/markdown", "Cache-Control": "no-store" })).data;
    },
    getGithubRepos: async (type: opensourceType) => {
        const ret = [];
        let page = 1;
        if (cacheGithubApiReposResponse.length == 0) {
            while (true) {
                try {
                    const path = `/github/repos?type=all&sort=full_name&direction=asc&per_page=100&page=${page}`;
                    const response = await apiClient.get<any[]>(path, undefined, { "Accept": "application/vnd.github.v3+json", "Cache-Control": "no-store" });
                    if (response.status != 200) {
                        throw new Error("Couldn't fetch repos");
                    }
                    ret.push(...response.data);
                    if (response.data.length == 0) {
                        break;
                    }
                    page++;
                    cacheGithubApiReposResponse.push(...ret);
                } catch (e) {
                    break;
                }
            }
        }else {
            ret.push(...cacheGithubApiReposResponse);
        }
        return ret.filter(i => (i["topics"] as string[]).includes(`base-registries-${type}`)).sort(repo => repo.name);
    }
}
export default TranslationClient;

export type ImplementationModelType = "adressenregister" | "gebouwenregister" | "wegenregister";
export type opensourceType = "application" | "component"
export namespace Faq {
    export interface TableOfContents {
        topics: Array<Topic>;
    }

    export interface Accordion {
        accordion: Array<AccordionItem>;
    }

    export interface AccordionItem {
        question: string | undefined;
        answer: string | undefined;
      }

    export interface Topic {
        title: string;
        questions: Array<Question>;
    }

    export interface Question {
        title: string;
        file: string;
    }
}
export namespace ErrorDetail {
    export interface TableOfContents {
        knownErrors: Array<KnownError>;
    }

    export interface KnownError {
        id: string;
        title: string;
    }
}
