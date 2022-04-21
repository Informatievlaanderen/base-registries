<template>
  <vl-hero-navigation :active-index="1">
    <vl-hero-navigation-item
      title="Informatie"
      link-text="Verkennen"
      background="#eee url('img/vlaamse-overheid.jpg')"
      to="/informatie">
      Waarom zijn ze er? Wat doen ze? Ontdek er hier alles over.
    </vl-hero-navigation-item>

    <vl-hero-navigation-item
      title="Documentatie"
      link-text="Bekijken"
      href="/docs"
      background="#eee url('img/vlaams-parlement.jpg')">
      Hoe gebruik ik ze in mijn systemen? Leer het hier.
    </vl-hero-navigation-item>

</template>

<script>
export default {
  name: 'IntroductionHero',
};
</script>
