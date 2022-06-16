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
                <y-markdown v-if="$data.markdownLoaded" :src="$data.header" />
              </header>
            </div>

            <div class="ma-0 pa-0">
              <div class="ma-0 pa-0">
                <vl-typography>
                  <y-markdown v-if="$data.markdownLoaded" :src="$data.content" />
                </vl-typography>
              </div>
              <div class="ma-0 pa-0">
                <div v-for="registry in getRegistryIds" :key="registry" class="ma-0 pa-0">
                  <h3 class="vl-title vl-title--h3 ma-0 py-4" :style="{ color: '#05c' }">
                    {{ $l(`status.registries.${registry}.title`) }}
                  </h3>
                  <div v-for="statusType in statusTypes" :key="statusType.name">
                    <vl-status-category
                      v-if="
                        $l(`status.registries.${registry}.${statusType.name}`)
                      "
                      :loading="!statusType.loaded"
                      :title="getCategoryTitle(statusType.name)"
                      :items="transformedStatusItems && transformedStatusItems[registry] && transformedStatusItems[registry] && transformedStatusItems[registry][statusType.name] || []"
                      class="ma-0 pa-0"
                      @refresh="refresh(statusType.name)"
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
import StatusCategory from "../components/StatusCategory.vue";
import { PublicApiClient } from "../../../services/public-api-client";

export default Vue.extend({
  localeName: "status",
  hasMarkdown: false,
  components: {
    "vl-status-category": StatusCategory,
  },
  data() {
    return {
      statusItems: {} as { [registry: string]: RegistryItem<any> },
      transformedStatusItems: {} as { [registry: string]: RegistryItem<StatusItem[]> },
      statusTypes: [
        {
          name:"projections",
          loaded:false 
        },
        {
          name:"feed",
          loaded:false 
        },
        {
          name:"cache",
          loaded:false 
        },
        {
          name:"import",
          loaded:false 
        },
        {
          name:"syndication",
          loaded:false 
        }
      ] as Array<{name:StatusType, loaded: boolean}>,

    };
  },
  async mounted() {
    this.init();
  },
  computed: {
    getRegistryIds() {
      const status = this.$l("status.registries");
      return Object.keys(status);
    }
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
      const type = this.statusTypes.find((i: {name:StatusType, loaded: boolean}) => i.name == statusType);
      type!.loaded = false;
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
      type!.loaded = true;
    },
    getItems(statusType: StatusType, data: any): StatusItem[] {
      const ret = [] as StatusItem[];
      if (!data) {
        return ret;
      }

      if (statusType === "feed") {
        try {
          ret.push(...this.getFeedItems(statusType, data));
        } catch(e) {
          ret.push({ success:false, error: e } as StatusItem);
        }
      }
      if (statusType === "import") {
        try {
          ret.push(...this.getImportItems(statusType, data));
        } catch(e) {
          ret.push({ success:false, error: e } as StatusItem);
        }
      }
      if (statusType === "projections") {
        try {
          ret.push(...this.getProjectionItems(statusType, data));
        } catch(e) {
          ret.push({ success:false, error: e } as StatusItem);
        }
      }
      if (statusType === "cache") {
        try {
          ret.push(...this.getCacheItems(statusType, data));
        } catch(e) {
          ret.push({ success:false, error: e } as StatusItem);
        }
      }
      if (statusType === "syndication") {
        try {
          const syndication = this.getSyndicationItems(statusType, data);
          if(syndication) {
            ret.push(...syndication);
          }
        } catch(e) {
          ret.push({ success:false, error: e } as StatusItem);
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

      if (!syndicationResponse) {
        throw {
          title:"Register synchronisatie status ophalen is mislukt",
          text:"Er is iets fout gelopen tijdens het ophalen van de status van de register synchronisatie. Probeer het later opnieuw.",
          inline: false,
        };
      }

      const projectionsResponse = this.statusItems;
      const items = syndicationResponse && syndicationResponse.syndications
      .map((i) => {
        const registry = i.name.toLowerCase().replace("addresslink","").replace("unit", "").replace("postalinfo", "postal");
        const p = (projectionsResponse[registry] as any) as {projections: {streamPosition: number } | undefined | null };
        if (!p.projections) {
            return {
              planed: false,
              paused: false,
              play: false,
              text: i.name,
              success: false,
              error: {title: "", text: "Er is iets fout gelopen tijdens het ophalen van de synchronisatie-bron status.", inline: true},
          }as StatusItem;
        }
        let streamPosition = p.projections && p.projections.streamPosition;
        const info = this.getRightTextInfo(i.currentPosition, (streamPosition || 0));
        const item: StatusItem = {
          planed: false,
          paused: false,
          play: true,
          text: i.name,
          rightText: info.rightText,
          success: info.success,
          error: undefined,
        };
        return item;
      });
      return items;
    },
    getCacheItems(statusType: StatusType, data: any) {
      const cacheResponse = (data[statusType]) as Array<{
          name: string,
          numberOfRecordsToProcess: number,
        }> | null | undefined;

      if (!cacheResponse) {
        throw {
          title: "Cache status ophalen is mislukt",
          text: "Er is iets fout gelopen tijdens het ophalen van de status van de cache. Probeer het later opnieuw.",
          inline: false,
        }
      }
      const items = cacheResponse
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
          error: undefined,
        };
        return item;
      });
      return items;
    },
    getProjectionItems(statusType: StatusType, data: any) {
      const projectionResponse = (data[statusType]) as {
        projections: Array<{
          key: string,
          name: string,
          state: "unknown" | "subscribed" | "catchingUp" | "stopped" | "crashed",
          currentPosition: number,
        }>,
        streamPosition: number,
      } | null | undefined;
      if (projectionResponse === null || projectionResponse === undefined) {
        throw {
          title: "Projecties status ophalen is mislukt",
          text: "Er is iets fout gelopen tijdens het ophalen van de status van de projecties. Probeer het later opnieuw.",
          inline: false,
        };
      }
      
      const items = projectionResponse?.projections
      .filter(i => !i.name.includes("Feed endpoint "))
      .map((i) => {
          const info = this.getRightTextInfo(i.currentPosition, projectionResponse.streamPosition);
          const item: StatusItem = {
            planed: false,
            paused: i.state == "stopped" || i.state == "crashed" || i.state == "unknown",
            play: i.state == "catchingUp" || i.state == "subscribed",
            text: i.name,
            rightText: info.rightText,
            success: info.success,
          error: undefined,
          };
          return item;
        });
      return items;
    },
    getFeedItems(statusType: StatusType, data: any) {
      const projectionResponse = (data[statusType]) as (
      {
        projections: Array<{
          key: string,
          name: string,
          state: "unknown" | "subscribed" | "catchingUp" | "stopped" | "crashed",
          currentPosition: number,
        }>,
        streamPosition: number,
      } | null | undefined );

      if (!projectionResponse) {
        throw {
          title: "Feed status ophalen is mislukt",
          text: "Er is iets fout gelopen tijdens het ophalen van de status van de feed. Probeer het later opnieuw.",
          inline: false,
        };
      }

      const items = projectionResponse.projections
      .filter(i => i.name.includes("Feed endpoint "))
      .map((i) => {
        const info = this.getRightTextInfo(i.currentPosition, projectionResponse.streamPosition);
        console.log(i.state == "stopped" || i.state == "crashed" || i.state == "unknown")
        const item: StatusItem = {
          planed: false,
          paused: i.state == "stopped" || i.state == "crashed" || i.state == "unknown",
          play: i.state == "catchingUp" || i.state == "subscribed",
          text: i.name,
          rightText: info.rightText,
          success: info.success,
          error: undefined,
        };
        return item;
      });
      return items;
    },
    getImportItems(statusType: StatusType, data: any) {
      const imports = (data[statusType]) as Array<{
        currentImport: any;
        name: string;
        lastCompletedImport: { from: Date; until: string };
      }> | null |  undefined;

      if (!imports) {
        throw {
          title:"Import status ophalen is mislukt",
          text: "Er is iets fout gelopen tijdens het ophalen van de status van de import. Probeer het later opnieuw.",
          inline: false,
        };
      }

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
          error: undefined,
        };
        return item;
      });
      return items;
    },
    getCategoryTitle(statusType: StatusType): string {
      const names = {
        projections: "Projecties",
        feed: "Feed",
        cache: "Cache",
        import: "Import",
        syndication: "Register synchronisatie"
      };
      return (<string>(<any>names)[statusType]);
    },
    getRightTextInfo(currentPosition: number, desiredPosition: number) {
        const percentage = currentPosition / desiredPosition * 100.0;
        const percentageWith2Decimals = Number.parseFloat(percentage.toFixed(2));
        let ret = {success: false, rightText: ""};
        if(percentageWith2Decimals == 100.00) {
          ret.success = true;
          ret.rightText = "100%";
        } else if(percentageWith2Decimals <= 94.99) {
          ret.rightText = `${percentageWith2Decimals.toLocaleString("nl-BE")}%`;
        } else if(percentageWith2Decimals > 94.99 && percentageWith2Decimals <= 99.99 ) {
          var formatter  = new Intl.NumberFormat("nl-BE");
          ret.rightText = `${formatter.format(currentPosition)} /  ${formatter.format(desiredPosition)}`;
        }
        return ret;
    }
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
  error: { title:string, text:string, inline: boolean } | undefined;
}
</script>