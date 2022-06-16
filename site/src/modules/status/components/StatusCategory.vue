<template>
  <div v-if="loaded" class="status my-1">
    <div class="status-header px-3 py-4">
      <div class="vl-title vl-title--h6 ma-0 pa-0 status-header-title">
        <span>{{ title }} <vl-icon :style="prepandIconColor" mod-large v-if="content" :icon="prepandIcon" mod-small /></span>
      </div>
      <div class="status-header-actions"><vl-button icon="synchronize" mod-icon @click="$emit('refresh')" /></div>
    </div>
    <div class="items px-3 py-4">
      <template v-if="!contentLoading && content">
        <vl-status-item
          v-for="(item, key) in getItems"
          :key="key"
          :play="item.play"
          :planed="item.planed"
          :paused="item.paused"
          :stopped="item.stopped"
          :hide-prepand-icon="item.hidePrepandIcon"
          :hide-append-icon="item.hideAppendIcon"
          :success="item.success"
          :text="item.text"
          :right-text="item.rightText"
          :error="item.error"
        />
      </template>
      <template v-else>
        <div class="status-item px-3 py-4 px-3">
          <div>
            <div v-vl-align:center>
              <vl-loader message="Even geduld." />
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>


<script lang="ts">
import Vue from "vue";
import StatusItem from "./StatusItem.vue";

export default Vue.extend({
  components: {
    "vl-status-item": StatusItem,
  },
  props: {
    title: {
      type: String,
      default: "ABCD",
    },
    items: {
      type: Array,
      required: false,
    },
    loading: {
      type: Boolean,
      default: true,
    },
  },
  mounted() {
    this.loaded = true;
  },
  data() {
    return {
      loaded: false,
      contentLoading: true,
      content: {
        items: [] as Array<StatusItem>
      }
    }
  },
  computed: {
    prepandIcon(): string {
      const hasIssues = this.content.items.map((i: any) => i.success).includes(false);
      return hasIssues ? "warning" : "calendar_check";
    },
    prepandIconColor() {
      const hasErrors = this.content.items.map((i: StatusItem) => i.error !== undefined && i.error.inline == false).includes(true);
      const hasWarnings = this.content.items.map((i: any) => i.success).includes(false);
      if(hasErrors) {
        return {color:"#aa2729"};
      }
      if(hasWarnings){
        return {color:"orange"};
      }
      return {color:"green"};
    },
    getItems(): Array<StatusItem> {
      return this.content.items.sort((a, b) => a.text.localeCompare(b.text));
    },
  },
  watch: {
    items: {
      deep: true,
      immediate: true,
      handler(newVal) {
        if(this.content && newVal) {
          const data = newVal as StatusItem[];
          this.content.items.splice(0);
          this.content.items.push(...data);
        }
        
      },
    },
    loading: {
      immediate: true,
      handler(newVal) {
        this.contentLoading = newVal;
      }
    }
  },
});

interface StatusItem {
  play: boolean;
  paused: boolean;
  planed: boolean;
  stopped: boolean;
  hideAppendIcon: boolean;
  hidePrepandIcon: boolean;
  text: string;
  rightText: string;
  success: boolean;
  error: { title:string, text:string, inline: boolean } | undefined;
}

</script>

<style lang="scss" scoped>
.status {
  border:1px solid #cbd2da;
}

.status-header {
  display: flex;
  align-items: center;
  
  .status-header-title {
    flex-grow: 4;
    text-align: left;
    text-transform: capitalize;
  }
  
  .status-header-actions {
    flex-grow: 1;
    text-align: right;
  }
}
</style>