<template>
  <div class="vl-status__category">
   <div :class="`vl-status__title vl-alert vl-alert--${alertLevel}`">
      <div>{{ title }}</div>
      <div v-if="alertLevel!='none'" class="vl-alert__icon">
          <span aria-hidden="true" :class="`vl-icon vl-vi vl-vi-${alertLevel}`"></span>
      </div>
      <div
        v-if="showRefresh"
        class="vl-status__category-refresh --right"
        @click="refreshCategory" />
    </div>
    <slot />  
  </div>
</template>

<style lang="scss">
.vl-status__category {
    padding: 1rem;
    border: 1px solid #cbd2da;
    flex-direction: column;
    margin-bottom: 1rem;
}

.vl-status__category .vl-status__title {
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

.vl-status__category .vl-icon::before {
    content: "\F21F";
}

.vl-status__category .vl-icon.vl-vi-success::before {
    content: "\F144";
}

.vl-status__category .vl-icon.vl-vi-warning::before {
    content: "\F107";
}

.vl-status__category .vl-icon.vl-vi-error::before {
    content: "\F109";
}

.vl-status__category-refresh {
  color: #05c;
}

.vl-status__category-refresh:hover {
  transform: rotate(-30deg);
  cursor: pointer;
}

.vl-status__category-refresh.--right {
  margin-left: auto;
}

.vl-status__category-refresh::after {
  font-family: 'vlaanderen-icon';
  content: "\F24F";
  font-weight: 600;
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
    showRefresh: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  methods: {
    refreshCategory: function(){
      this.$emit('refreshCategory');
    },
  },
};
</script>
