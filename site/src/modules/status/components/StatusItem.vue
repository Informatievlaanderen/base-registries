<template>
  <div class="status-item pa-2 px-3">
    <div class="left"><vl-icon :icon="prepandIcon" mod-small /></div>
    <div class="mid pl-3"><vl-typography>{{text}}</vl-typography></div>
    <div class="right"><span>{{rightText}} <vl-icon :icon="appendIcon" mod-small/></span></div>
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
    }
  },
  computed: {
    prepandIcon(): string {
      if(this.planed)
        return "synchronize-timeout";
      if(this.play)
        return "play";
      else if(this.paused) 
        return "paused";
      return "stopped"
    },
    appendIcon(): string {
      if(this.success){
        return "calendar_check";
      }
      return "warning";
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
}

</style>