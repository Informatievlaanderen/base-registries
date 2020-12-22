<template>
  <div>
    <h3 itemprop="name" class="vl-registry-status-item__title">{{ title }}</h3>
    <projection-status :status="status.projections" />
    <!-- <cache-status>{{ status.cache }}</cache-status> -->
    <!-- <import-status>{{ status.import }}</import-status> -->
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
};
</script>
