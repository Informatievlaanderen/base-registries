<template>
  <vl-hero-navigation :active-index="1">
    <vl-hero-navigation-item
      title="Informatie"
      linkText="Verkennen"
      background="#eee url('img/vlaamse-overheid.jpg')"
      to="/informatie">Waarom zijn ze er? Wat doen ze? Ontdek er hier alles over.</vl-hero-navigation-item>

    <vl-hero-navigation-item
      title="Documentatie"
      linkText="Bekijken"
      href="https://docs.basisregisters.vlaanderen.be"
      background="#eee url('img/vlaams-parlement.jpg')"
    >Hoe gebruik ik ze in mijn systemen? Leer het hier.</vl-hero-navigation-item>

    <vl-hero-navigation-item
      title="Registratie"
      href="https://portal.basisregisters.vlaanderen.be"
      linkText="Registreren"
      background="#eee url('img/vlaamse-regering.jpg')"
    >Wie kan ze gebruiken? Hoe krijg ik toegang? Lees snel verder!</vl-hero-navigation-item>

    <vl-hero-navigation-item
      title="Ondersteuning"
      linkText="Vragen"
      href="https://www.vlaanderen.be/nl"
      background="#eee url('img/gemeenten.jpg')"
    >&#8220;Help! I need somebody&hellip;&#8221;<br>Krijg hier antwoord op al uw vragen&hellip;</vl-hero-navigation-item>
  </vl-hero-navigation>
</template>

<script>
export default {
  name: "IntroductionHero"
};
</script>
