<template>
  <div>
    <h3 itemprop="name" class="vl-registry-status-item__title">{{ title }}</h3>
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
    <import-status
      v-if="!status.hide.includes('import')"
      :status="status.import"
      :is-loading="status.isLoading.includes('import')"
       @refresh="refresh('import')" />
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
