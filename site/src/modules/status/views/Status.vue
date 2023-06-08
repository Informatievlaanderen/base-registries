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
                <div
                  v-for="registry in registries"
                  :key="registry.key"
                  :id="registry.title"
                  class="ma-0 pa-0"
                >
                  <h3 class="vl-title vl-title--h3 ma-0 py-4" :style="{ color: '#05c' }">
                    <a :href="`#${registry.title}`">{{
                      registry.title
                    }}</a>
                  </h3>
                  <div v-for="statusType in statusTypes" :key="statusType.name">
                    <vl-status-category
                      v-if="$l(`status.registries.${registry.key}.${statusType.name}`)"
                      :loading="!statusType.loaded"
                      :title="statusType.title"
                      :items="
                        (transformedStatusItems &&
                          transformedStatusItems[registry.key] &&
                          transformedStatusItems[registry.key] &&
                          transformedStatusItems[registry.key][statusType.name]) ||
                        []
                      "
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
  hasMarkdown: true,
  components: {
    "vl-status-category": StatusCategory,
  },
  data() {
    return {
      statusItems: {} as { [registry: string]: RegistryItem<any> },
      transformedStatusItems: {} as { [registry: string]: RegistryItem<StatusItem[]> },
      statusTypes: [
        {
          name: "import",
          title: "Import",
          loaded: false,
        },
        {
          name: "projections",
          title: "Projecties",
          loaded: false,
        },
        {
          name: "producer",
          title: "Producer",
          loaded: false,
        },
        {
          name: "feed",
          title: "Feed",
          loaded: false,
        },
        {
          name: "syndication",
          title: "Register synchronisatie",
          loaded: false,
        },
        {
          name: "cache",
          title: "Cache",
          loaded: false,
        },
      ] as Array<{ name: StatusType; title: string; loaded: boolean }>,
      syndicationTranslations: [
        {
          key: "Municipality",
          value: "Feed gemeenten",
        },
        {
          key: "PostalInfo",
          value: "Feed postinfo",
        },
        {
          key: "StreetName",
          value: "Feed straatnamen",
        },
        {
          key: "Address",
          value: "Feed adressen",
        },
        {
          key: "Parcel",
          value: "Feed percelen",
        },
        {
          key: "BuildingUnit",
          value: "Feed gebouwen",
        },
        {
          key: "Address",
          value: "Feed adressen t.b.v. extract adreskoppelingen",
        },
        {
          key: "ParcelAddressLink",
          value: "Feed percelen t.b.v. extract adreskoppelingen",
        },
        {
          key: "BuildingUnitAddressLink",
          value: "Feed gebouwen t.b.v. extract adreskoppelingen",
        },
      ] as Array<{ key: string; value: string }>,
    };
  },
  async mounted() {
    await this.init();
  },
  computed: {
    registries() {
      const status = this.$l("status.registries");
      return Object.keys(status).map((registry) => {
        return {
          key: registry,
          title: this.$l(`status.registries.${registry}.title`),
        };
      });
    },
  },
  methods: {
    async init() {
      this.refresh("projections");
      this.refresh("producer");
      this.refresh("feed");
      this.refresh("import");
      this.refresh("cache");
      this.refresh("syndication");
    },
    async refresh(statusType: StatusType) {
      const type = this.statusTypes.find((i: { name: StatusType; loaded: boolean }) => i.name == statusType);
      type!.loaded = false;
      let data = {} as any;
      switch (statusType) {
        case "projections":
        case "feed":
          data = await PublicApiClient.getProjectionStatus();
          break;
        case "producer":
          data = await PublicApiClient.getProducerStatus();
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
        } catch (e) {
          ret.push({ success: false, error: e } as StatusItem);
        }
      }
      if (statusType === "import") {
        try {
          ret.push(...this.getImportItems(statusType, data));
        } catch (e) {
          ret.push({ success: false, error: e } as StatusItem);
        }
      }
      if (statusType === "projections") {
        try {
          ret.push(...this.getProjectionItems(statusType, data));
        } catch (e) {
          ret.push({ success: false, error: e } as StatusItem);
        }
      }
      if (statusType === "producer") {
        try {
          ret.push(...this.getProducerItems(statusType, data));
        } catch (e) {
          ret.push({ success: false, error: e } as StatusItem);
        }
      }
      if (statusType === "cache") {
        try {
          ret.push(...this.getCacheItems(statusType, data));
        } catch (e) {
          ret.push({ success: false, error: e } as StatusItem);
        }
      }
      if (statusType === "syndication") {
        try {
          const syndication = this.getSyndicationItems(statusType, data);
          if (syndication) {
            ret.push(...syndication);
          }
        } catch (e) {
          ret.push({ success: false, error: e } as StatusItem);
        }
      }
      return ret;
    },
    getSyndicationItems(statusType: StatusType, data: any) {
      const syndicationResponse = data[statusType] as
        | {
            syndications: Array<{
              name: string;
              currentPosition: number;
            }>;
          }
        | null
        | undefined;

      if (!syndicationResponse) {
        throw {
          title: "Register synchronisatie status ophalen is mislukt",
          text: "Er is iets fout gelopen tijdens het ophalen van de status van de register synchronisatie. Probeer het later opnieuw.",
          inline: false,
        };
      }

      const projectionsResponse = this.statusItems;
      const items =
        syndicationResponse &&
        syndicationResponse.syndications.map((i) => {
          const registry = i.name
            .toLowerCase()
            .replace("addresslink", "")
            .replace("unit", "")
            .replace("postalinfo", "postal");
          const p = projectionsResponse[registry] as any as {
            projections: { streamPosition: number } | undefined | null;
          };
          const name =
            this.syndicationTranslations.find((y) => y.key.toLowerCase() == i.name.toLocaleLowerCase())?.value ||
            i.name;
          if (!p.projections) {
            return {
              planed: false,
              paused: false,
              play: false,
              stopped: false,
              hidePrepandIcon: true,
              hoverText: "",
              prependHoverText: "",
              disableHoverText: true,
              text: name,
              success: false,
              error: {
                title: "",
                text: "Er is iets fout gelopen tijdens het ophalen van de synchronisatie-bron status.",
                inline: true,
              },
            } as StatusItem;
          }
          let streamPosition = p.projections && p.projections.streamPosition;
          let currentPosition = i.currentPosition;
          if (i.name == "municipality" || i.name == "postalInfo") {
            currentPosition++;
          }
          const info = this.getRightTextInfo(currentPosition, streamPosition || 0);
          const item: StatusItem = {
            planed: false,
            paused: false,
            play: true,
            stopped: false,
            hideAppendIcon: false,
            hidePrepandIcon: true,
            hoverText: "",
            prependHoverText: "",
            disableHoverText: true,
            text: name,
            rightText: info.rightText,
            success: info.success,
            error: undefined,
          };
          return item;
        });
      return items;
    },
    getCacheItems(statusType: StatusType, data: any) {
      const cacheResponse = data[statusType] as
        | Array<{
            name: string;
            numberOfRecordsToProcess: number;
          }>
        | null
        | undefined;

      if (!cacheResponse) {
        throw {
          title: "Cache status ophalen is mislukt",
          text: "Er is iets fout gelopen tijdens het ophalen van de status van de cache. Probeer het later opnieuw.",
          inline: false,
        };
      }
      const items = cacheResponse.map((i) => {
        const success = i.numberOfRecordsToProcess == 0;
        const rightText = success ? "" : `Aantal niet gecachte objecten: ${i.numberOfRecordsToProcess}`;
        const item: StatusItem = {
          planed: false,
          paused: false,
          play: false,
          stopped: !success,
          hideAppendIcon: false,
          hidePrepandIcon: true,
          disableHoverText: true,
          hoverText: "",
          prependHoverText: "",
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
      const projectionResponse = data[statusType] as
        | {
            projections: Array<{
              key: string;
              name: string;
              description: string;
              state: "unknown" | "subscribed" | "catchingUp" | "stopped" | "crashed";
              currentPosition: number;
            }>;
            streamPosition: number;
          }
        | null
        | undefined;
      if (projectionResponse === null || projectionResponse === undefined) {
        throw {
          title: "Projecties status ophalen is mislukt",
          text: "Er is iets fout gelopen tijdens het ophalen van de status van de projecties. Probeer het later opnieuw.",
          inline: false,
        };
      }

      const items = projectionResponse?.projections
        .filter((i) => !i.name.includes("Feed endpoint "))
        .map((i) => {
          const info = this.getRightTextInfo(i.currentPosition, projectionResponse.streamPosition);
          const item: StatusItem = {
            planed: false,
            paused: i.state == "crashed" || i.state == "unknown",
            play: i.state == "catchingUp" || i.state == "subscribed",
            stopped: i.state == "stopped",
            hideAppendIcon: false,
            hidePrepandIcon: false,
            hoverText: i.description,
            disableHoverText: false,
            prependHoverText: i.state,
            text: i.name,
            rightText: info.rightText,
            success: info.success,
            error: undefined,
          };
          return item;
        });
      return items;
    },
    getProducerItems(statusType: StatusType, data: any) {
      const ProducerResponse = data[statusType] as
        | {
            projections: Array<{
              key: string;
              name: string;
              description: string;
              state: "unknown" | "subscribed" | "catchingUp" | "stopped" | "crashed";
              currentPosition: number;
            }>;
            streamPosition: number;
          }
        | null
        | undefined;
      if (ProducerResponse === null || ProducerResponse === undefined) {
        throw {
          title: "Producers status ophalen is mislukt",
          text: "Er is iets fout gelopen tijdens het ophalen van de status van de producers. Probeer het later opnieuw.",
          inline: false,
        };
      }

      const items = ProducerResponse?.projections
        .filter((i) => !i.name.includes("Feed endpoint "))
        .map((i) => {
          const info = this.getRightTextInfo(i.currentPosition, ProducerResponse.streamPosition);
          const item: StatusItem = {
            planed: false,
            paused: i.state == "crashed" || i.state == "unknown",
            play: i.state == "catchingUp" || i.state == "subscribed",
            stopped: i.state == "stopped",
            hideAppendIcon: false,
            hidePrepandIcon: false,
            hoverText: i.description,
            disableHoverText: false,
            prependHoverText: i.state,
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
      const projectionResponse = data[statusType] as
        | {
            projections: Array<{
              key: string;
              name: string;
              description: string;
              state: "unknown" | "subscribed" | "catchingUp" | "stopped" | "crashed";
              currentPosition: number;
            }>;
            streamPosition: number;
          }
        | null
        | undefined;

      if (!projectionResponse) {
        throw {
          title: "Feed status ophalen is mislukt",
          text: "Er is iets fout gelopen tijdens het ophalen van de status van de feed. Probeer het later opnieuw.",
          inline: false,
        };
      }

      const items = projectionResponse.projections
        .filter((i) => i.name.includes("Feed endpoint "))
        .map((i) => {
          const info = this.getRightTextInfo(i.currentPosition, projectionResponse.streamPosition);
          const item: StatusItem = {
            planed: false,
            paused: i.state == "stopped" || i.state == "crashed" || i.state == "unknown",
            play: i.state == "catchingUp" || i.state == "subscribed",
            stopped: false,
            hideAppendIcon: false,
            hidePrepandIcon: false,
            hoverText: i.description,
            prependHoverText: i.state,
            disableHoverText: false,
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
      const imports = data[statusType] as
        | Array<{
            currentImport: any;
            name: string;
            lastCompletedImport: { from: Date; until: string };
          }>
        | null
        | undefined;

      if (!imports) {
        throw {
          title: "Import status ophalen is mislukt",
          text: "Er is iets fout gelopen tijdens het ophalen van de status van de import. Probeer het later opnieuw.",
          inline: false,
        };
      }

      const twoDigit = (v: number) => String(v).padStart(2, "0");
      const dateTimeToString = (d: Date) =>
        `${twoDigit(d.getDate())}/${twoDigit(d.getMonth() + 1)}/${d.getFullYear()} ${twoDigit(d.getHours())}:${twoDigit(
          d.getMinutes()
        )}:${twoDigit(d.getSeconds())}`;

      const items = imports.map((i) => {
        const fullname = i.name.split(".");
        const name = fullname[fullname.length - 1];
        const d = new Date(i.lastCompletedImport.until);
        const datetime = dateTimeToString(d);
        const item: StatusItem = {
          planed: true,
          paused: false,
          play: false,
          stopped: false,
          hideAppendIcon: false,
          hidePrepandIcon: false,
          hoverText: "",
          prependHoverText: "",
          disableHoverText: false,
          text: `CRAB import ${name.replace("importer", "")}`,
          rightText: `Laatste wijziging: ${datetime}`,
          success: true,
          error: undefined,
        };
        return item;
      });
      return items;
    },
    getRightTextInfo(currentPosition: number, desiredPosition: number) {
      const percentage = (currentPosition / desiredPosition) * 100.0;
      const percentageWith2Decimals = Number.parseFloat(percentage.toFixed(2));
      let ret = { success: false, rightText: "" };
      if (percentageWith2Decimals == 100.0) {
        ret.success = true;
        ret.rightText = "100%";
      } else if (percentageWith2Decimals <= 94.99) {
        ret.rightText = `${percentageWith2Decimals.toLocaleString("nl-BE")}%`;
      } else if (percentageWith2Decimals > 94.99 && percentageWith2Decimals <= 99.99) {
        var formatter = new Intl.NumberFormat("nl-BE");
        ret.rightText = `${formatter.format(currentPosition)} /  ${formatter.format(desiredPosition)}`;
      }
      return ret;
    },
  },
});

type StatusType = "projections" | "producer" | "feed" | "cache" | "import" | "syndication";

interface RegistryItem<T> {
  projections: T;
  producer: T;
  feed: T;
  cache: T;
  import: T;
  syndication: T;
}

interface StatusItem {
  play: boolean;
  paused: boolean;
  planed: boolean;
  stopped: boolean;
  hideAppendIcon: boolean;
  hidePrepandIcon: boolean;
  prependHoverText: string;
  disableHoverText: boolean;
  hoverText: string;
  text: string;
  rightText: string;
  success: boolean;
  error: { title: string; text: string; inline: boolean } | undefined;
}
</script>
