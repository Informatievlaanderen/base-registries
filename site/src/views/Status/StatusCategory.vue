<template>
  <div class="vl-status__catergory">
   <div :class="`vl-status__title vl-alert vl-alert--${alertLevel}`">
      <div>{{ title }}</div>
      <div class="vl-alert__icon">
          <span aria-hidden="true" :class="`vl-icon vl-vi vl-vi-${alertLevel}`"></span>
      </div>
    </div>
    <slot />  
  </div>
</template>

<style lang="scss">
.vl-status__catergory {
    padding: 1rem;
    border: 1px solid #cbd2da;
    flex-direction: column;
}

.vl-status__catergory .vl-status__title {
    padding: 1rem;
    background-color: #fff;
    border: none;
    flex-direction: row;
}

.vl-status__title div {
    flex-direction: row;
    display: inline-block;

    &.vl-alert__icon  {
      margin-left: 0.5rem;
    }
}

.vl-status__catergory .vl-icon::before {
    content: "\F21F";
}

.vl-status__catergory .vl-icon.vl-vi-success::before {
    content: "\F144";
}

.vl-status__catergory .vl-icon.vl-vi-warning::before {
    content: "\F107";
}

.vl-status__catergory .vl-icon.vl-vi-error::before {
    content: "\F109";
}
</style>

<script>
export default {
  name: 'StatusCategory',
  components: {},
  props: {
    alertLevel: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
};
</script>