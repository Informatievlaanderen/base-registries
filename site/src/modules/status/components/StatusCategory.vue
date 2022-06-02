<template>
  <div v-if="loaded" class="status my-1">
    <div class="status-header pa-2">
      <div class="vl-title vl-title--h6 ma-0 pa-0 status-header-title">
        <span>{{ title }} <vl-icon v-if="content" :icon="prepandIcon" mod-small /></span>
      </div>
      <div class="status-header-actions"><vl-button icon="synchronize" mod-icon @click="$emit('refresh')" /></div>
    </div>
    <div class="items pa-2">
      <template v-if="!contentLoading && content">
        <vl-status-item
          v-for="(item, key) in content.items"
          :key="key"
          :play="item.play"
          :planed="item.planed"
          :paused="item.paused"
          :success="item.success"
          :text="item.text"
          :right-text="item.rightText"
        />
      </template>
      <template v-else>
        <div class="status-item pa-2 px-3">
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
        items: [] as Array<{
          play: boolean;
          paused: boolean;
          planed: boolean;
          text: string;
          rightText: string;
          success: boolean;
        }>
      }
    }
  },
  computed: {
    prepandIcon(): string {
      const hasIssues = this.content.items.map((i: any) => i.success).includes(false);
      return hasIssues ? "warning" : "calendar_check";
    },
    getItems(): Array<{play: boolean; paused: boolean; planed: boolean; text: string; rightText: string; success: boolean; }> {
      return this.content.items;
    },
  },
  watch: {
    items: {
      deep: true,
      immediate: true,
      handler(newVal) {
        if(this.content && newVal) {
          const data = newVal as {
            play: boolean;
            paused: boolean;
            planed: boolean;
            text: string;
            rightText: string;
            success: boolean;
          }[];
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