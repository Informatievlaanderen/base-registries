<template>
  <div id="app">
    <vl-header />

    <router-view />

    <vl-footer />
  </div>
</template>

<style lang="scss">
  @import './vlaanderen.scss';
  @import './vlaanderen-wp.scss';

  #app { padding-top: 30px; }

  [id]::before {
    content: '';
    display: block;
    height: 45px;
    margin-top: -45px;
    visibility: hidden;
  }

  @media (max-width: 580px) {
    #app { padding-top: 45px; }

    .vl-hero-navigation__list__listitem--active .vl-hero-navigation__title {
      text-decoration: none;
    }
  }
</style>
