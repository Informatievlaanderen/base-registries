<template>
  <vl-page>
    <vl-main class="px-2">
      <vl-region>
        <vl-layout>
          <div>
            <div class="ma-0 pa-0 mt-7">
              <div>
                <vl-link :to="$l('backButtons.home.url')" mod-bold v-l="`backButtons.home.text`" />
              </div>
              <header>
                <y-markdown v-if="loaded" :src="header" />
              </header>
            </div>

            <div class="ma-0 pa-0">
              <div class="ma-0 pa-0">
                <vl-typography>
                  <y-markdown v-if="loaded" :src="content" />
                </vl-typography>
              </div>
              <div class="ma-0 pa-0">
                <div v-for="registry in getRegistryIds" :key="registry" class="ma-0 pa-0">
                  <h3 class="vl-title vl-title--h3 ma-0 py-4" :style="{ color: '#05c' }">
                    {{ $l(`status.registries.${registry}.title`) }}
                  </h3>
                  <div v-for="statusType in statusTypes" :key="statusType">
                    <vl-status-category
                      v-if="
                        loaded &&
                        $l(`status.registries.${registry}.${statusType}`) &&
                        transformedStatusItems[registry] &&
                        transformedStatusItems[registry][statusType]
                      "
                      :title="statusType"
                      :items="transformedStatusItems[registry][statusType]"
                      class="ma-0 pa-0"
                      @refresh="refresh(statusType)"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </vl-layout>
      </vl-region>
    </vl-main>
  </vl-page>
</template>


<script lang="ts">
import Vue from "vue";
// import RegistryStatus from '../components/RegistryStatus.vue';
import StatusCategory from "../components/StatusCategory.vue";
import { PublicApiClient } from "../../../services/public-api-client";

export default Vue.extend({
  components: {
    "vl-status-category": StatusCategory,
  },
  data() {
    return {
      loaded: true as boolean,
      header: "" as string,
      content: "" as string,
      statusItems: {} as { [registry: string]: RegistryItem<any> },
      transformedStatusItems: {} as { [registry: string]: RegistryItem<StatusItem[]> },
      statusTypes: ["projections", "feed", "cache", "import", "syndication"] as StatusType[],
    };
  },
  created() {
    this.$emit("updateStatus", false);
  },
  async mounted() {
    this.loaded = false;
    //  this.header = await TranslationClient.getPageMarkdownHeader("nl", "status") || "";
    //  this.content = await TranslationClient.getPageMarkdownContent("nl", "status") || "";
    await this.init();
    this.loaded = true;
    this.$emit("updateStatus", true);
  },
  computed: {
    getRegistryIds() {
      const status = this.$l("status.registries");
      return Object.keys(status);
    },
    sidebar(): { title: string; urls: { title: string; url: string }[] } | undefined {
      const items = this.$l("status.sidebar");
      if (!items) return undefined;
      return items as { title: string; urls: { title: string; url: string }[] };
    },
  },
  methods: {
    async init() {
      await this.refresh("projections");
      await this.refresh("feed");
      await this.refresh("import");
      await this.refresh("cache");
      await this.refresh("syndication");
    },
    async refresh(statusType: StatusType) {
      let data = {} as any;
      switch (statusType) {
        case "projections":
        case "feed":
          data = await PublicApiClient.getProjectionStatus();
          break;
        case "cache":
          data = await PublicApiClient.getCacheStatus();
          break;
        case "import":
          data = await PublicApiClient.getImportStatus();
          break;
        case "syndication":
          data = await PublicApiClient.getSyndicationStatus();
          break;
      }
      Object.keys(data).forEach((r: string) => {
        const registryId = r.replace("Registry", "").toLowerCase();
        this.statusItems[registryId] = Object.assign(this.statusItems[registryId] || {}, { [statusType]: data[r] });
        const d = this.getItems(statusType, this.statusItems[registryId]);
        this.transformedStatusItems[registryId] = Object.assign(this.transformedStatusItems[registryId] || {}, {
          [statusType]: d,
        });
      });
    },
    getItems(statusType: StatusType, data: any): StatusItem[] {
      const ret = [] as StatusItem[];
      if (!data) {
        return ret;
      }

      if (statusType === "feed") {
        ret.push(...this.getFeedItems(statusType, data));
      }
      if (statusType === "import") {
        ret.push(...this.getImportItems(statusType, data));
      }
      if (statusType === "projections") {
        ret.push(...this.getProjectionItems(statusType, data));
      }
      if (statusType === "cache") {
        ret.push(...this.getCacheItems(statusType, data));
      }
      if (statusType === "syndication") {
        const syndication = this.getSyndicationItems(statusType, data);
        if(syndication) {
          ret.push(...syndication);
        }
      }
      return ret;
    },
    getSyndicationItems(statusType: StatusType, data: any) {
      const syndicationResponse = (data[statusType]) as {
        syndications: Array<{
          name: string,
          currentPosition: number,
        }>
      } | null | undefined;

      const projectionsResponse = this.statusItems;
      const items = syndicationResponse && syndicationResponse.syndications
      .map((i) => {
        const registry = i.name.toLowerCase().replace("addresslink","").replace("unit", "").replace("postalinfo", "postal");
        const p = (projectionsResponse[registry] as any || {}) as {projections: {streamPosition: number } | undefined};
        let streamPosition = p.projections && p.projections.streamPosition;
        const percentage = i.currentPosition / (streamPosition || 0) * 100;
        const success = percentage.toFixed(5) == "100.00000";
        const item: StatusItem = {
          planed: false,
          paused: false,
          play: true,
          text: i.name,
          rightText: `${percentage.toLocaleString("nl-BE")}%`,
          success,
        };
        return item;
      });
      return items;
    },
    getCacheItems(statusType: StatusType, data: any) {
      const projectionResponse = (data[statusType] || []) as Array<{
          name: string,
          numberOfRecordsToProcess: number,
        }>;

      const items = projectionResponse
      .map((i) => {
        const success = i.numberOfRecordsToProcess == 0;
        const rightText = success ? "" : `Aantal niet gecachte objecten: ${i.numberOfRecordsToProcess}`
        const item: StatusItem = {
          planed: false,
          paused: false,
          play: false,
          text: i.name,
          rightText,
          success,
        };
        return item;
      });
      return items;
    },
    getProjectionItems(statusType: StatusType, data: any) {
      const projectionResponse = (data[statusType] || {}) as {
        projections: Array<{
          key: string,
          name: string,
          state: "unknown" | "subscribed" | "catchingUp" | "stopped" | "crashed",
          currentPosition: number,
        }>,
        streamPosition: number,
      };

      const items = projectionResponse.projections
      .filter(i => !i.name.includes("Feed endpoint "))
      .map((i) => {
        
        const percentage = i.currentPosition / projectionResponse.streamPosition * 100;
        const item: StatusItem = {
          planed: false,
          paused: i.state == "stopped" || i.state == "crashed" || i.state == "unknown",
          play: i.state == "catchingUp" || i.state == "subscribed",
          text: i.name,
          rightText: `${percentage.toLocaleString("nl-BE")}%`,
          success: percentage == 100,
        };
        return item;
      });
      return items;
    },
    getFeedItems(statusType: StatusType, data: any) {
      const projectionResponse = (data[statusType] || {}) as {
        projections: Array<{
          key: string,
          name: string,
          state: "unknown" | "subscribed" | "catchingUp" | "stopped" | "crashed",
          currentPosition: number,
        }>,
        streamPosition: number,
      };

      const items = projectionResponse.projections
      .filter(i => i.name.includes("Feed endpoint "))
      .map((i) => {
        
        const percentage = i.currentPosition / projectionResponse.streamPosition * 100;
        const item: StatusItem = {
          planed: false,
          paused: i.state == "stopped" || i.state == "crashed" || i.state == "unknown",
          play: i.state == "catchingUp" || i.state == "subscribed",
          text: i.name,
          rightText: `${percentage.toLocaleString("nl-BE")}%`,
          success: percentage == 100,
        };
        return item;
      });
      return items;
    },
    getImportItems(statusType: StatusType, data: any) {
      const imports = (data[statusType] || {}) as Array<{
        currentImport: any;
        name: string;
        lastCompletedImport: { from: Date; until: string };
      }>;
      const items = imports.map((i) => {
        const fullname = i.name.split(".");
        const name = fullname[fullname.length - 1];
        const d = new Date(i.lastCompletedImport.until);
        const datetime = `${d.getDate()}/${d.getMonth()}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
        const item: StatusItem = {
          planed: true,
          paused: false,
          play: false,
          text: `CRAB import ${name.replace("importer", "")}`,
          rightText: `Laatste wijziging: ${datetime}`,
          success: true,
        };
        return item;
      });
      return items;
    },
  },
});

type StatusType = "projections" | "feed" | "cache" | "import" | "syndication";

interface RegistryItem<T> {
  projections: T;
  feed: T;
  cache: T;
  import: T;
  syndication: T;
}

interface StatusItem {
  play: boolean;
  paused: boolean;
  planed: boolean;
  text: string;
  rightText: string;
  success: boolean;
}
</script>