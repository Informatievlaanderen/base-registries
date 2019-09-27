<template>
  <vl-page>
    <vl-main>
      <vl-region>
        <vl-layout>
          <IntroductionHero />
        </vl-layout>
      </vl-region>

      <vl-region mod-alt>
        <vl-layout>
          <vl-grid>
            <vl-column width="4" width-s="12">
              <vl-spotlight
                title="Algemeen"
                subtitle="Wat zijn de basisregisters?"
                to="/algemeen"
                tagName="router-link"
              />
            </vl-column>
            <vl-column width="4" width-s="12">
              <vl-spotlight
                title="Aanleiding"
                subtitle="Waarom een stelsel van basisregisters?"
                to="/aanleiding"
                tagName="router-link"
              />
            </vl-column>
            <vl-column width="4" width-s="12">
              <vl-spotlight
                title="Visie"
                subtitle="Wie werkt mee?"
                to="/visie"
                tagName="router-link"
              />
            </vl-column>
          </vl-grid>
        </vl-layout>
      </vl-region>

      <vl-region>
        <vl-layout>
          <vl-grid>
            <vl-column width="4" width-s="12">
              <vl-spotlight
                title="Release notes"
                subtitle="Documentatie bij huidige en vorige releases"
                to="/release-notes"
                tagName="router-link"
                mod-small
              />
            </vl-column>
            <vl-column width="4" width-s="12">
              <vl-spotlight
                title="Veelgestelde vragen"
                subtitle="Veelgestelde vragen (en de bijhorende antwoorden) over de basisregisters"
                to="/veelgestelde-vragen"
                tagName="router-link"
                mod-small
              />
            </vl-column>
          </vl-grid>
        </vl-layout>
      </vl-region>

      <vl-region mod-overlap>
        <vl-layout>
          <vl-grid>
            <vl-column width="12">
              <vl-grid mod-stacked>
                <vl-column width="12">
                  <vl-contact-data title="Contact" icon="contacts">
                    <vl-properties>
                      <vl-properties-list>
                        <vl-properties-label>Adres</vl-properties-label>
                        <vl-properties-data>
                          Herman Teirlinckgebouw
                          <br />Havenlaan 88
                          <br />1000 Brussel, België
                        </vl-properties-data>
                        <vl-properties-label>Telefoon</vl-properties-label>
                        <vl-properties-data>
                          <p>
                            <vl-link href="tel:+3292761500">Bel 09 276 15 00</vl-link>
                          </p>
                          <p>Bereikbaar elke werkdag tussen 9 en 19 uur</p>
                        </vl-properties-data>
                        <vl-properties-label>E-mail</vl-properties-label>
                        <vl-properties-data>
                          <p>
                            <vl-link
                              href="https://www.vlaanderen.be/nl/vlaamse-overheid/contact/stuur-een-e-mail"
                            >Stuur een e-mail</vl-link>
                          </p>
                          <p>Antwoord binnen 2 werkdagen</p>
                        </vl-properties-data>
                      </vl-properties-list>
                    </vl-properties>
                  </vl-contact-data>
                </vl-column>

                <vl-column width="12">
                  <vl-column width="12">
                    <vl-u-ruler mod-wave></vl-u-ruler>
                  </vl-column>
                </vl-column>

                <vl-column width="12">
                  <vl-contact-data title="Een klacht of melding?" icon="chat">
                    <vl-grid mod-stacked>
                      <vl-column width="8" width-m="12">
                        <vl-typography>
                          <p>Bent u niet tevreden over de werking van de Vlaamse overheid? Bent u het niet eens met een beslissing in een dossier? Neem contact op met de bevoegde dienst.</p>
                          <p>
                            <vl-link
                              href="https://www.vlaanderen.be/een-klacht-over-een-vlaamse-overheidsdienst"
                            >Meer over de klachtenprocedure</vl-link>
                          </p>
                        </vl-typography>
                      </vl-column>
                    </vl-grid>
                  </vl-contact-data>
                </vl-column>
              </vl-grid>
            </vl-column>
          </vl-grid>
        </vl-layout>
      </vl-region>
    </vl-main>
  </vl-page>
</template>

<script>
import IntroductionHero from "@/components/IntroductionHero.vue";

export default {
  name: "home",
  components: {
    IntroductionHero
  }
};
</script>
