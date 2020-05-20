<template>
  <vl-agenda-item
    tag-name="vl-link"
    mod-no-class
    :title="title"
    :to="to"
    :text="text"
    :date="{
      datetime: '1900-01-01',
      day: 'versie',
      month: version,
    }" />
</template>

<style lang="scss">
  .vl-agenda-item {
    padding-left: 7rem;
  }

  .vl-agenda-item--no-link .vl-agenda-item__date {
    background-color: #05c;
  }

  .vl-agenda-item__date {
    width: 5.5rem;
    padding: 1.5rem .7rem;
  }

  .vl-agenda-item__date__day {
    display: block;
    font-weight: 400;
    font-size: 0.75em;
  }

  .vl-agenda-item__date__month {
    font-weight: 400;
    font-size: 1em;
  }
</style>

<script>
export default {
  name: 'Version',
  props: {
    title: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    version: {
      type: String,
      required: true,
    },
  },
};
</script>
