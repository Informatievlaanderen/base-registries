<template>
  <div class="status my-1">
    <div class="status-header pa-2">
      <div class="vl-title vl-title--h6 ma-0 pa-0 status-header-title">
        <span>{{ title }} <vl-icon :icon="prepandIcon" mod-small /></span>
      </div>
      <div class="status-header-actions"><vl-button icon="synchronize" mod-icon @click="$emit('refresh')" /></div>
    </div>
    <div class="items pa-2">
      <vl-status-item
        v-for="(item, key) in getItems"
        :key="key"
        :play="item.play"
        :planed="item.planed"
        :paused="item.paused"
        :success="item.success"
        :text="item.text"
        :right-text="item.rightText"
      />
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
  },
  computed: {
    prepandIcon(): string {
      const hasIssues = this.items.map((i: any) => i.success).includes(false);
      return hasIssues ? "warning" : "calendar_check";
    },
    getItems(): {
      play: boolean;
      paused: boolean;
      planed: boolean;
      text: string;
      rightText: string;
      success: boolean;
    }[] {
      return (this.items || []) as {
        play: boolean;
        paused: boolean;
        planed: boolean;
        text: string;
        rightText: string;
        success: boolean;
      }[];
    },
  },
  watch: {
    items: {
      deep: true,
      immediate: true,
      handler(newVal) {
        console.log(newVal);
      },
    },
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