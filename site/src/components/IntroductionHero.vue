<template>
    <vl-hero-navigation :active-index="1">
      <vl-hero-navigation-item
        title="Vlaamse overheid"
        linkText="Lees verder"
        href="https://www.vlaanderen.be/nl"
        background="red">
        Lees alles over de organisatie en de structuur van de Vlaamse overheid
        en de 12 beleidsdomeinen. U vindt hier ook de openstaande vacatures bij
        de Vlaamse overheid, de publicaties en alle details over de 6de staatshervorming.
      </vl-hero-navigation-item>
      <vl-hero-navigation-item
        title="Vlaamse regering"
        linkText="Lees verder"
        href="https://www.vlaanderen.be/nl"
        background="green">
        Wie zijn de ministers in de regering-Bourgeois? Lees hier alles over hun beleid,
        het regeerakkoord, de beslissingen van de laatste ministerraad en de persberichten.
      </vl-hero-navigation-item>
      <vl-hero-navigation-item
        title="Vlaamse parlement"
        href="https://www.vlaanderen.be/nl"
        background="blue">
        Hoe werkt het Vlaams Parlement en wat staat er op de agenda van de volgende vergadering?
        Wie zijn de volksvertegenwoordigers? U vindt hier de contactgegevens
        van het Vlaams Parlement en alle informatie over de volgende verkiezingen.
      </vl-hero-navigation-item>
      <vl-hero-navigation-item
        title="Gemeenten en provincies"
        linkText="Lees verder"
        href="https://www.vlaanderen.be/nl"
        background="yellow">
        Lees meer over de 308 Vlaamse gemeenten en 5 provincies.
        U vindt hier ook de contactgegevens van de gemeenten, de OCMW's,
        en meer informatie over de werking en bevoegdheden van de lokale besturen.
      </vl-hero-navigation-item>
    </vl-hero-navigation>
</template>

<script>
export default {
  name: "IntroductionHero"
};
</script>
