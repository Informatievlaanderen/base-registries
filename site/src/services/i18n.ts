import Vue from "vue";
import VueI18n from "vue-i18n";
import TranslationClient, { Faq, ErrorDetail, ImplementationModelType } from "./translations-client";
import { DirectiveBinding } from "vue/types/options";
import  Util from "./util";

Vue.use(VueI18n);

const translations = Vue.observable({
    nl: {} as any,
    faqTableOfContents: {} as Faq.TableOfContents,
    faqAccordionItems: {} as Faq.Accordion,
    errorDetailTableOfContents: {} as ErrorDetail.TableOfContents
});

const i18n = {
    translate: (key: string, args?: any): any => {        
        //type check
        const value = Util.GetPropByName(translations.nl, key);
        if (typeof value === "boolean") {
            return value;
        }
        if(!value) return key;
        if (args){
            const onMissingParam = (paramName: string) => console.warn(`No parameter '${paramName}' passed for key '${key}'`);
            return Util.interpolateString(value, args, onMissingParam);
        } 
        return value;
    },
    directive: (el: HTMLElement, binding: DirectiveBinding) => {
        let key = binding.value || el.innerText;
        let translation: string;
        if (typeof binding.value === "string") {
            translation = i18n.translate(key);
        } else {
            key = binding.value.key;
            delete binding.value.key;
            translation = i18n.translate(key, binding.value);
        }
        el.innerHTML = translation;
    },
    async init() {
        await i18n.refresh();
    },
    async refresh() {
        const result = await TranslationClient.getTranslations("nl");
        translations.nl = { ...result } as any;
        const path = window.location.pathname; 
        if (path.startsWith("/foutmeldingen/")) {
            const data = await TranslationClient.getErrorDetailTableOfContents("nl");
            translations.errorDetailTableOfContents = { ...data };
        }
        if (path.startsWith("/veelgestelde-vragen")){
            const data = await TranslationClient.getAccordion("nl", "faq");
            translations.faqAccordionItems = { ...data };
        }
    }
}
const { init, refresh, directive, translate } = i18n;

Vue.directive("l", { 
    bind: (el, binding) => directive(el, binding), 
    update: (el, binding) => directive(el, binding) 
});
Vue.prototype.$l = translate;
Vue.prototype.localeName = undefined as string | undefined;
Vue.prototype.hasMarkdown = false;
declare module "vue/types/vue" {
    interface Vue { 
        $l: (key: string, args?: any) => any;
        
    }
}
declare module 'vue/types/options' {
    interface ComponentOptions<V extends Vue> {
      localeName?: string;
      hasMarkdown?: boolean;
      implementationModelRegistry?: ImplementationModelType;
    }
  }

export default {
    init,
    refresh,
    translations
}