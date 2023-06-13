import Vue from "vue";
import { TranslationClient, Faq } from "@/services/translations-client";
import * as i18n from "@/services/i18n";
import * as env from "@/environment";

interface LocalePropertyOptions {
  title: string,
  prefix: string,
  version: string | undefined,
  redirect: { url: string } | undefined;
  sidebar: {
    title: string | undefined;
    urls: {
      title: string;
      url: string;
    }[];
  } | undefined,
  doormatItems: {
    title: string | undefined;
    text: string | undefined;
    url: string | undefined;
    hide: boolean | undefined;
  }[] | undefined;
  spotlightItems: {
    title: string | undefined;
    subtitle: string | undefined;
    text: string | undefined;
    url: string | LocaleData.EnvVars | undefined;
    hide: boolean | undefined;
  }[] | undefined;
}

export namespace LocaleData {
  export interface Data {
    header: string;
    content: string;
    markdownLoaded: boolean,
    spotlightItems: SpotlightItem[];
    sidebar: Sidebar;
  }

  export interface SpotlightItem {
    title: string | undefined;
    subtitle: string | undefined;
    text: string | undefined;
    url: string | EnvVars | undefined;
  }

  export interface EnvVars {
    dev: string;
    stg: string;
    prd: string;
  }

  export interface DoormatItem {
    title: string | undefined;
    url: string | undefined;
  }

  export interface Sidebar {
    title: string | undefined;
    urls: { title: string; url: string; }[];
  }

  export interface AccordionItem {
    question: string | undefined;
    answer: string | undefined;
  }
}

Vue.mixin(Vue.extend({
  async created() {
    if (this.$options.localeName) {
      this.$emit("updateStatus", false);
      this.redirect();
      this.getSpotlightItems();
      this.getDoormatItems();
      this.getFaqAccordionItems();
      this.getSidebar();
      await this.getImplementationModelMarkdown();

      this.$emit("updateStatus", true);

      const options = this.getDefaultLocaleOptions();

      this.$emit("pageLoaded", {
        isHomePage: this.$options.localeName === "home",
        prefix: options?.prefix || 'Basisregisters Vlaanderen',
        title: options?.title || this.$options.localeName
      });
    }
  },
  data() {
    return {
      header: "" as string,
      content: "" as string,
      implementationModelContent: "" as string,
      markdownLoaded: false as boolean,
      spotlightItems: [] as LocaleData.SpotlightItem[],
      doormatItems: [] as LocaleData.DoormatItem[],
      faqAccordionItems: [] as Faq.AccordionItem[],
      sidebar: {} as LocaleData.Sidebar
    }
  },
  computed: {
    nl() {
      return i18n.default.translations.nl;
    }
  },
  methods: {
    getFaqAccordionItems() {

      const accordionItems = i18n.default.translations.faqAccordionItems["accordion"] as Faq.AccordionItem[];

      if (accordionItems) {
        this.faqAccordionItems.splice(0);
        accordionItems.forEach(item => {
          this.faqAccordionItems.push(item);
        });
      }      
    },
    async getMarkdown() {
      if (this.$options.localeName && this.$options.hasMarkdown === true) {
        TranslationClient.getPageMarkdownHeader("nl", this.$options.localeName)
          .then(data => this.header = data)
          .catch(e => this.header = "");

        TranslationClient.getPageMarkdownContent("nl", this.$options.localeName)
          .then(data => this.content = data)
          .catch(e => this.content = "");

        this.markdownLoaded = true;
      }
    },
    async getImplementationModelMarkdown() {
      if (this.$options.localeName && this.$options.implementationModelRegistry) {
        const options = this.getDefaultLocaleOptions();
        const registry = this.$options.implementationModelRegistry;
        const version = options?.version || "";
        TranslationClient.getImplementationModelMarkdown(registry, version)
          .then(data => this.implementationModelContent = data)
          .catch(e => this.implementationModelContent = "");
        this.markdownLoaded = true;
      }
    },
    getSpotlightItems() {
      const options = this.getDefaultLocaleOptions();
      if (options && options.spotlightItems) {
        this.spotlightItems.splice(0);
        options.spotlightItems.forEach(item => {
          const isEnvVar = (<LocaleData.EnvVars>item.url)?.dev !== undefined;
          if (isEnvVar) {
            let url = (<LocaleData.EnvVars>item.url).prd;
            if (
              env.BRANCH_CONTENT == "main" ||
              env.BRANCH_CONTENT == "tst" ||
              env.BRANCH_CONTENT == "dev") {
              url = (<LocaleData.EnvVars>item.url).dev;
            } else if (env.BRANCH_CONTENT == "stg") {
              url = (<LocaleData.EnvVars>item.url).stg;
            }
            item.url = url;
          }
          if(item.hide !== true) {
            this.spotlightItems.push(item);
          }
        });
      }
    },
    getDoormatItems() {
      const options = this.getDefaultLocaleOptions();
      if (options && options.doormatItems) {
        this.doormatItems.splice(0);
        this.doormatItems.push(...options.doormatItems.filter(i => i.hide !== true));
      }
    },
    getSidebar() {
      const options = this.getDefaultLocaleOptions();
      if (options && options.sidebar) {
        this.sidebar = options.sidebar as any;
      }
    },
    getLocaleOptions<T>(): T | undefined {
      return this.$options.localeName ? this.nl[this.$options.localeName] as T : undefined;
    },
    getDefaultLocaleOptions(): LocalePropertyOptions | undefined {
      return this.getLocaleOptions<LocalePropertyOptions>();
    },
    redirect(): void {
      const options = this.getDefaultLocaleOptions();
      if (options?.redirect?.url) {
        this.$router.push(options.redirect.url)
      }
    }
  }
}));

