<template>
  <div v-html="content" />
</template>

<script lang="ts">
import Vue from "vue";
import { marked } from "marked";

export default Vue.extend({
  props: {
    src: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      content: "" as string,
      renderer: new MyRenderer({headerIds: true, headerPrefix:""}),
    };
  },
  watch: {
    src: {
      deep: true,
      immediate: true,
      handler(newValue) {
        marked.parse(newValue, { renderer: this.renderer }, this.onParseCallback);
      },
    },
  },
  methods: {
    onParseCallback(error: any, parseResult: string): void {
      if (!error) {
        this.content = parseResult;
      }
    },
  },
});

type MarkdownExtensionType = "class" | "id" | "data";

class MyRenderer<T = never> extends marked.Renderer<T> {
  constructor(options: marked.MarkedOptions | marked.MarkedExtension) {
    super(options as marked.MarkedOptions);
  }
  link(
    this: marked.Renderer | marked.RendererThis,
    href: string | null,
    title: string | null,
    text: string
  ): string | T {
    if (href === null) {
      return text;
    }
    const attributes = !href.startsWith("/") && !href.startsWith("#") ? `target="_blank" rel="noopener noreferrer nofollow"` : "";
    const attributeTitle = title ? `title="${title}"` : "";
    const noProtocolUrl = href.replace("http:", "").replace("https:", "");
    const out = `<a href="${encodeURI(noProtocolUrl, )}" ${attributeTitle} ${attributes} >${text}</a>`;
    return out;
  }
  heading(
    this: marked.Renderer | marked.RendererThis,
    text: string,
    level: 1 | 2 | 3 | 4 | 5 | 6,
    raw: string,
    slugger: marked.Slugger
  ): string | T {
    const { idAttr, classAttr, dataAttr, innerText } = transformMarkdownExtensionData(text, raw);
    const tag = `<h${level} class="vl-title vl-title--h${level}"${idAttr}${classAttr}${dataAttr}>${innerText}</h${level}>\n`;
    return tag;
  }
}

  function getMarkdownExtensionData(raw: string): {classes: string[], data: {key:string, value: string}[], id: string | undefined, raws:string[] } {
    const ret: {classes: string[], data: {key:string, value: string}[], id: string | undefined, raws:string[] } = {
      classes: [],
      data: [],
      id: undefined,
      raws: []
    }
    const classPattern = /(\s+?{class=(([\w'-'.](\s)?)+?)})/gi;
    const dataPattern = /\s+?{data-(\w+?)=(.+?)}/g;
    const idPattern = /\s+?{#([\w-_]+?)}/g;

    
    let data;
    while (dataPattern.global && (data = dataPattern.exec(raw))) {
      if(data) {
        ret.raws.push(data[0]);
        ret.data.push({key: data[1].trim(), value: data[2].trim()});
      }
    }

    const classes = classPattern.exec(raw);
    if(classes) {
      ret.raws.push(classes[0]);
      ret.classes = classes[2].trim().split(" ");
    }
    
    const id = idPattern.exec(raw);
    if(id) {
      ret.raws.push(id[0]);
      ret.id = id[1].trim();
    }
    return ret;
  }
  function transformMarkdownExtensionData(text:string, raw:string) {
    const extensionData = getMarkdownExtensionData(raw);
    
    let idAttr = "";
    if(extensionData.id) {
      idAttr += ` id="${extensionData.id}"`
    }

    let classAttr = "";
    if(extensionData.classes.length > 0) {
      classAttr += ` class="${extensionData.classes.join(' ')}"`
    }

    let dataAttr = "";
    if(extensionData.data.length > 0) {
      extensionData.data.forEach(d => dataAttr += ` data-${d.key}="${d.value}"`);
    }

    let innerText = text;
    if(extensionData.raws.length > 0) {
      extensionData.raws.forEach(r =>{
        const pattern = new RegExp(r);
        innerText = innerText.replace(pattern,'');
      });
    }

    return {
      idAttr,
      classAttr,
      dataAttr,
      innerText
    }
  }
</script>

<style lang="scss" scoped>
</style>