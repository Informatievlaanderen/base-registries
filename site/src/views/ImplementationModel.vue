<template>
  <vl-page>
    <vl-region mod-no-space-bottom>
      <vl-layout>
        <header class="wp-pt-heading">
          <div class="wp-pt-heading__parent">
            <vl-link to="/" mod-bold>Overzicht</vl-link>
          </div>

          <div class="wp-pt-heading__title-wrapper">
            <vl-title tag-name="h1" class="wp-pt-heading__title">Implementatiemodel</vl-title>
          </div>
        </header>

      </vl-layout>
    </vl-region>

    <vl-main>
      <vl-region>
        <vl-layout>
          <vl-grid mod-stacked>
            <vl-column width="8" width-m="9" width-s="12">
              <vl-grid mod-stacked>
                <vl-column width="12">
                  <vl-typography>
                    <p>
                      Een implementatiemodel is een specificatie voor gegevensuitwisseling voor applicaties die een bepaalde use case vervullen.
                      Het laat toe om naast een gedeelde semantiek ook bijkomende restricties op te leggen, zoals het vastleggen van kardinaliteiten
                      of het gebruik van bepaalde codelijsten.
                      Een implementatiemodel dient als documentatie voor analisten, ontwikkelaars en dataleveranciers.
                    </p>
                    <p>
                    Het implementatiemodel bouwt voort op een reeks bestaande standaarden waaronder:
                      <ul>
                        <li>
                          <a href="https://data.vlaanderen.be/standaarden/kandidaat-standaard/applicatieprofiel-adresregister.html">
                            Applicatieprofiel adressenregister
                          </a>
                        </li>
                        <li>
                          <a href="https://data.vlaanderen.be/standaarden/erkende-standaard/vocabularium-adres.html">
                            Vocabularium adressenregister
                          </a>
                        </li>
                        <li>
                          <a href="https://data.vlaanderen.be/standaarden/kandidaat-standaard/applicatieprofiel-gebouwenregister.html">
                            Applicatieprofiel gebouwenregister
                          </a>
                        </li>
                        <li>
                          <a href="https://data.vlaanderen.be/standaarden/kandidaat-standaard/vocabularium-gebouw.html">
                            Vocabilarium gebouwenregister
                          </a>
                        </li>
                      </ul>
                    </p>
                  </vl-typography>

                    <vl-grid mod-stacked>
                    <vl-column width="6" width-s="12">
                      <vl-doormat
                        title="Adressenregister"
                        tag-name="router-link"
                        to="implementatiemodel/adressenregister" />
                    </vl-column>

                    <vl-column width="6" width-s="12">
                      <vl-doormat
                        title="Gebouwenregister"
                        tag-name="router-link"
                        to="implementatiemodel/gebouwenregister" />
                    </vl-column>
                  </vl-grid>
                </vl-column>
              </vl-grid>
            </vl-column>

          </vl-grid>
        </vl-layout>
      </vl-region>
    </vl-main>
  </vl-page>
</template>
