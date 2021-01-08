<template>
  <span v-if="hasContent" class="tooltip">
    {{ text }}
  </span>
</template>

<style lang="scss">
.tooltip-on-hover {
    position: relative;
}

.tooltip-on-hover > .tooltip {
  visibility: hidden;
  background-color:  #fff;
  color: #333332;
  text-align: center;
  border-radius: 6px;
  border: 1px solid;
  padding: 0 0.5em;
  font-size: 0.8em;
  display: block;
  opacity: 0.8;

  /* Position the tooltip */
  position: absolute;
  left: 1em;
  top: calc(100% - 0.3em);
  z-index: 1;
}

.tooltip-on-hover:hover > .tooltip {
  visibility: visible;
}
</style>

<script>
export default {
  name: 'Tooltip',
  components: {},
  props: {
    text: {
      type: String,
      required: false,
      default: null,
    },
  },
  data: function () {
    return {
      hasContent: this.text,
    };
  },
};
</script>
