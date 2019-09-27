<template>
  <vl-hero-navigation :active-index="1">
    <vl-hero-navigation-item
      title="Informatie"
      linkText="Verkennen"
      background="#eee"
      to="/informatie">Bla bla bla bla</vl-hero-navigation-item>

    <vl-hero-navigation-item
      title="Documentatie"
      linkText="Bekijken"
      href="https://docs.basisregisters.vlaanderen"
      background="#eee"
    >Bla</vl-hero-navigation-item>

    <vl-hero-navigation-item
      title="Registratie"
      href="https://www.vlaanderen.be/nl"
      linkText="Registreren"
      background="#eee"
    >Bla</vl-hero-navigation-item>

    <vl-hero-navigation-item
      title="Ondersteuning"
      linkText="Vragen"
      href="https://www.vlaanderen.be/nl"
      background="#eee"
    >Bla</vl-hero-navigation-item>
  </vl-hero-navigation>
</template>

<script>
export default {
  name: "IntroductionHero"
};
</script>
