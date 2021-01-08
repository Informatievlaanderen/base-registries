<template>
  <div class="registry-status">
    <h3 itemprop="name" class="vl-registry-status-item__title">{{ title }}</h3>
    <import-status
      v-if="!status.hide.includes('import')"
      :status="status.import"
      :is-loading="status.isLoading.includes('import')"
       @refresh="refresh('import')" />
    <projection-status
      v-if="!status.hide.includes('projections')"
      :status="status.projections"
      :is-loading="status.isLoading.includes('projections')"
      @refresh="refresh('projections')" />
    <cache-status
      v-if="!status.hide.includes('cache')"
      :status="status.cache"
      :is-loading="status.isLoading.includes('cache')"
      @refresh="refresh('cache')" />
  </div>
</template>

<style lang="scss">
  .vl-registry-status-item__title {
    color: #05c;
    font-weight: 500;
  }

  .vl-registry-status-item__type {
    margin-top: 0.5em;
  }

  .registry-status .tooltip::after {
    visibility: hidden;
    background-color:  #fff;
    color: #333332;
    text-align: center;
    border-radius: 6px;
    border: 1px dotted;
    padding: 0 0.5rem;
    font-size: 0.8em;

    /* Position the tooltip */
    position: absolute;
    top: 50%;
    z-index: 1;
  }

  .tooltip::after {
    content: "?";
  }

  .tooltip:hover::after {
    visibility: visible;
  }
</style>

<script>
import ProjectionStatus from './ProjectionStatus.vue';
import CacheStatus from './CacheStatus.vue';
import ImportStatus from './ImportStatus.vue';

export default {
  name: 'RegistryStatus',
  components: { 
    ProjectionStatus,
    CacheStatus,
    ImportStatus,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    status: {
      type: Object,
      required: true,
    },
  },
  methods: {
    refresh: function(category) {
      this.$emit('refresh', [category]);
    },
  },
};
</script>
