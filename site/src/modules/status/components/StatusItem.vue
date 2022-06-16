<template>
  <div v-if="getError === undefined || getError.inline" class="status-item pa-2 px-3">
    <div class="left"><vl-icon v-if="!hidePrepandIcon" :icon="prepandIcon" mod-small /></div>
    <div class="mid pl-3"><vl-typography>{{text}}</vl-typography></div>
    <div class="right">
      <span class="vl-alert--error pa-2 mr-1 inline-error" v-if="getError">
        {{ getError.text }}
      </span>
      <span>{{rightText}} <vl-icon v-if="!hideAppendIcon" :style="appendIconColor" :icon="appendIcon" mod-large/></span>
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
    planed: {
      type: Boolean,
      default: false,
    },
    text:{
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
    error: {
      type: Object,
      default: undefined,
      required: false,
    }
  },
  computed: {
    prepandIcon(): string {
      if(this.planed)
        return "synchronize-timeout";
      if(this.play)
        return "play";
      else if(this.paused) 
        return "pause";
      return "stop"
    },
    appendIcon(): string {
      if(this.success){
        return "calendar_check";
      }
      if (this.play || this.planed || this.stopped) {
        return "warning";
      }
      return "question-mark"
    },
    appendIconColor() {
      if(this.success){
        return {color:"green"};
      }
      
      if (this.play || this.planed || this.stopped) {
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
  }

  .right {
    flex-grow: 1;
    text-align: right;
  }

  .inline-error {
    border: 1px solid #edafb1;
  }
}

</style>