<template>
  <vl-page>
    <vl-region mod-no-space-bottom>
      <vl-layout>
        <header class="wp-pt-heading">
          <div class="wp-pt-heading__parent">
            <vl-link to="/" mod-bold>Overzicht</vl-link>
          </div>

          <div class="wp-pt-heading__title-wrapper">
            <vl-title tag-name="h1" class="wp-pt-heading__title">Algemeen</vl-title>
          </div>

          <vl-grid>
            <vl-column width="9" width-s="12">
              <div class="wp-pt-heading__content">
                <vl-typography>
                  <vl-introduction>
                    De Vlaamse overheid trekt volop de kaart van de uitbouw van een <strong>geïntegreerd</strong> stelsel van <strong>authentieke</strong> gegevensbronnen.
                  </vl-introduction>
                </vl-typography>
              </div>
            </vl-column>
          </vl-grid>
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
                  <vl-title id="algemeen" tag-name="h2">Wat zijn de basisregisters?</vl-title>

                  <vl-typography>
                    <p>
                      Ter verbetering van haar beleidsvoering en dienstverlening trekt de Vlaamse overheid
                      volop de kaart van de uitbouw van een geïntegreerd stelsel van authentieke gegevensbronnen.
                    </p>
                    <p><vl-link to="/algemeen" icon="arrow-right-fat" mod-block mod-icon-before>Lees verder</vl-link></p>
                  </vl-typography>
                </vl-column>

                <vl-column width="12">
                  <vl-title id="aanleiding" tag-name="h2">Aanleiding voor de basisregisters</vl-title>

                  <vl-typography>
                    <p>
                      Informatie is zeer omvangrijk, maar ook zeer versnipperd.
                      De basisregisters moeten zorgen voor een efficiëntere doorstroming van informatie naar alle betrokken partijen.
                    </p>
                    <p><vl-link to="/aanleiding" icon="arrow-right-fat" mod-block mod-icon-before>Lees verder</vl-link></p>
                  </vl-typography>
                </vl-column>
              </vl-grid>
            </vl-column>

            <vl-column
              width="3"
              push="1"
              push-m="reset"
              width-s="12"
              class="wp-pt-side-navigation wp-pt-side-navigation--sticky-parent">
              <aside class="wp-pt-side-navigation--sticky" style="top: 120px;">
                <vl-side-navigation title="Op deze pagina">
                  <vl-side-navigation-list>
                    <vl-side-navigation-item href="#algemeen" text="Algemeen" />
                    <vl-side-navigation-item href="#aanleiding" text="Aanleiding" />
                    <vl-side-navigation-item href="#visie" text="Visie" />
                    <vl-side-navigation-item href="#aanbod" text="Aanbod" />
                  </vl-side-navigation-list>
                </vl-side-navigation>
              </aside>
            </vl-column>
          </vl-grid>
        </vl-layout>
      </vl-region>
    </vl-main>
  </vl-page>
</template>
