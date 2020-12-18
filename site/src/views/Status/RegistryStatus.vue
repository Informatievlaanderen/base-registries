<template>
  <div>
    <h3 itemprop="name" class="vl-registry-status-item__title">{{ title }}</h3>
    <projection-status>{{ status.projections }}</projection-status>
    <cache-status>{{ status.cache }}</cache-status>
    <import-status>{{ status.import }}</import-status>
  </div>
</template>

<style lang="scss">
  .vl-registry-status-item__title {
    color: #05c;
    font-weight: 500;
  }

  .todo-status-dashboard {
    border: 1px solid red;

    :before {
      color: red;
      content: 'Todo:';
      text-transform: uppercase;
      padding: 5px;
      font-weight: 600;
    }
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
