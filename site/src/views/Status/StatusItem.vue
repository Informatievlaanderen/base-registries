<template>
  <div :class="`vl-status__item vl-alert vl-alert--${alertLevel}`">
    <slot /> 
    <div class="vl-alert__icon">
        <span aria-hidden="true" :class="`vl-icon vl-vi vl-vi-${alertLevel}`"></span>
    </div>
  </div>
</template>

<style lang="scss">
.vl-status__item {
    padding: 1rem;
    background-color: #e8ebee;
    border-color: #cbd2da;
}

.vl-status__item div {
  margin: 0 0.5rem;
}

.vl-status__item div.--right {
  margin-left: auto;

  + div {
    margin-left: 0.5rem;
  }
}
.vl-status__item div.vl-alert__icon {
  margin-left: auto;
}

.vl-status__item .vl-icon::before {
    content: "\F21F";
}

.vl-status__item .vl-icon.vl-vi-success::before {
    content: "\F144";
}

.vl-status__item .vl-icon.vl-vi-warning::before {
    content: "\F107";
}

.vl-status__item .vl-icon.vl-vi-error::before {
    content: "\F109";
}
</style>

<script>
export default {
  name: 'StatusItem',
  components: {},
  props: {
    alertLevel: {
      type: String,
      required: true,
    },
  },
};
</script>