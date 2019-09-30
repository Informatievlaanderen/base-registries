<template>
  <div id="app">
    <header>
      <div class="vlw__primary-bar__brand">
        <a href="#" class="vlw__primary-bar__brand__umbrella vlw__primary-bar__brand__umbrella--primary">
          <div class="vlw__primary-bar__brand__umbrella__logo">
            <svg viewBox="0 0 32 32" role="img" class="vlw__primary-bar__brand__umbrella__logo__icon" aria-label="Logo Vlaamse overheid">
              <use xlink:href="#icon-flanders-logo"/>
            </svg>
            <p class="vlw__primary-bar__brand__umbrella__logo__label">Vlaanderen</p>
          </div>
        </a>
      </div>
    </header>

    <router-view />

    <footer>
      FOOTER HERE
    </footer>
  </div>
</template>

<style lang="scss">
  @import './vlaanderen.scss';
  @import './vlaanderen-wp.scss';
</style>
