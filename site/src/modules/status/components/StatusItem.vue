<template>
  <div v-if="getError === undefined || getError.inline" class="status-item pa-2 px-3">
    <div 
      class="left --tooltip --tooltip-bottom" 
      :data-content="prepandHoverText"
    >
      <vl-icon
        v-if="!hidePrepandIcon"
        :icon="prepandIcon"
        :style="prepandIconColor"
        mod-small
      />
    </div>
    <div class="mid pl-3" :class="{ 'refresh-failed': refreshFailed }">
      <vl-typography>
        <template v-if="disableHoverText">
          <span>{{text}}</span>
        </template>
        <template v-else>
          <span :data-content="hoverText || prepandHoverText" class="--tooltip --tooltip-bottom">
            {{text}}
          </span>
        </template>
      </vl-typography>
    </div>
    <div class="right">
      <span class="vl-alert--error pa-2 mr-1 inline-error" v-if="getError">
        {{ getError.text }}
      </span>
      <span
        :class="{ 'refresh-failed --tooltip --tooltip-bottom': refreshFailed }"
        :data-content="refreshFailed ? 'Status vernieuwen is mislukt, deze gegevens zijn mogelijk verouderd.' : undefined"
      >{{rightText}} <vl-icon v-if="!hideAppendIcon" :style="appendIconColor" :icon="appendIcon" mod-large/></span>
    </div>
  </div>
  <div v-else>
    <vl-alert
        icon="warning"
        :title="error.title"
        :content="error.text"
        mod-error
        role="alertdialog" />
  </div>
</template>


<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {
    play: {
      type: Boolean,
      default: false,
    },
    paused: {
      type: Boolean,
      default: false,
    },
    stopped: {
      type: Boolean,
      default: false,
    },
    hideAppendIcon: {
      type: Boolean,
      default: false,
    },
    hidePrepandIcon: {
      type: Boolean,
      default: false,
    },
    planned: {
      type: Boolean,
      default: false,
    },
    text:{
      type: String,
      default: "ABC"
    },
    disableHoverText:{
      type: Boolean,
      default: false,
    },
    hoverText:{
      type: String,
      default: "ABC"
    },
    rightText: {
      type: String,
      default: ""
    },
    success: {
      type: Boolean,
      default: false,
    },
    refreshFailed: {
      type: Boolean,
      default: false,
    },
    error: {
      type: Object,
      default: undefined,
      required: false,
    }
  },
  computed: {
    prepandIcon(): string {
      if(this.planned)
        return "synchronize-timeout";
      if(this.play)
        return "play";
      else if(this.paused) 
        return "pause";
      return "stop"
    },
    prepandIconColor() {
      return this.refreshFailed ? { color: "#aa2729" } : {};
    },
    prepandHoverText(): string {
      if(this.planned)
        return "Gepland";
      if(this.play)
        return "Actief";
      else if(this.paused) 
        return "Gepauzeerd";
      return "Stopped"
    },
    appendIcon(): string {
      if(this.refreshFailed){
        return "warning";
      }
      if(this.success){
        return "calendar_check";
      }
      if (this.play || this.planned || this.stopped) {
        return "warning";
      }
      return "question-mark"
    },
    appendIconColor() {
      if(this.refreshFailed){
        return {color:"#aa2729"};
      }
      if(this.success){
        return {color:"green"};
      }

      if (this.play || this.planned || this.stopped) {
        return {color:"orange"};
      }

      return {color:"black"};
    },
    getError(): {title:string, text:string, inline: boolean} | undefined {
      return this.error as {title:string, text:string, inline: boolean} | undefined;
    }
  }
});
</script>

<style lang="scss" scoped>


.status-item {
  display: flex;
  background: #e8ebee;
  border:1px solid #cbd2da;
  
  .left {
    flex-grow: 0;
    text-align: center;
  }
  
  .mid {
    flex-grow: 4;
    text-transform: full-width;
  }

  .right {
    flex-grow: 1;
    text-align: right;
  }

  .inline-error {
    border: 1px solid #edafb1;
  }

  .refresh-failed {
    color: #aa2729;
  }
}

</style>