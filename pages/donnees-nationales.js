import React from 'react'
import {pick} from 'lodash'
import DownloadIcon from 'react-icons/lib/fa/download'
import Page from '../layouts/main'

import Head from '../components/head'
import Section from '../components/section'

import BanCard from '../components/ban-card'

const title = 'Données nationales'
const description = 'Fichiers nationaux contenant les adresses du territoire.'

const actors = {
  DGFIP: 'https://portail.dgfip.finances.gouv.fr',
  ARCEP: 'https://www.arcep.fr/',
  'Bases Adresse Locales': 'https://adresse.data.gouv.fr/bases-locales',
  'La Poste': 'https://www.laposte.fr/',
  IGN: 'http://www.ign.fr/'
}

export default () => (
  <Page title={title} description={description}>
    <Head title={title} icon={<DownloadIcon />} />
    <Section>
      <h2>Données nationales</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque et est augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nunc vitae laoreet arcu. Maecenas suscipit urna in blandit pretium. In eu nunc metus. Mauris libero ante, pellentesque at accumsan maximus, egestas et eros. Phasellus interdum commodo dictum. Mauris finibus magna eu nulla condimentum luctus. Vivamus iaculis nisl id consequat bibendum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Quisque blandit odio nec odio lobortis semper. Aliquam rutrum neque eget ipsum elementum rutrum. Etiam ac eros non felis varius aliquam ac vitae metus. Suspendisse potenti. Etiam viverra nunc eget tortor ultricies cursus. Vivamus feugiat lacus sit amet mauris aliquam, sed tincidunt est elementum.
      </p>

    </Section>
    <Section>
      <h2>Fichiers disponibles</h2>
      <div className='cards'>
        <BanCard
          title='Base Adresse Nationale'
          producer='Partenaires BAN'
          licence='Pas de licence ou ODBL 1.0'
          updateFreq='Hebdomadaire'
          lastUpdate={new Date('11-28-2018')}
          addresses='22 millions'
          sources={pick(actors, ['DGFIP', 'ARCEP', 'Bases Adresse Locales'])}
          millesime='2018'
          label={false}
          tagline='« Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque non maximus enim »'
          link='https://adresse.data.gouv.fr/data/ban-v0/'
        />
        <BanCard
          title='Base Adresse Nationale enrichie'
          producer='ETALAB'
          licence='OdbL1.0'
          updateFreq='Hebdomadaire'
          lastUpdate={new Date('3-25-2019')}
          addresses='22,6 millions'
          certAddresses='2 millions'
          sources={pick(actors, ['IGN', 'La Poste', 'DGFIP', 'Bases Adresse Locales'])}
          millesime='2019'
          label
          tagline='« Sed sapien lacus, tempus id porta eu, sollicitudin vitae purus. Fusce rhoncus, quam volutpat bibendum »'
          link='https://adresse.data.gouv.fr/data/adresses-merge/ban-bal/'
        />
        <BanCard
          title='Adresses ouvertes'
          producer='ETALAB'
          licence='Licence Ouverte'
          updateFreq='Hebdomadaire'
          lastUpdate={new Date('3-25-2019')}
          addresses='20 millions'
          certAddresses='2 millions'
          sources={pick(actors, ['DGFIP', 'ARCEP', 'Bases Adresse Locales'])}
          millesime='2019'
          tagline='« Sed a turpis fringilla, interdum velit ac, varius metus »'
          link='https://adresse.data.gouv.fr/data/adresses-merge/cadastre-ftth-bal/'
          label
          focus
        />
      </div>
    </Section>

    <Section background='grey'>
      <h2>Sources de données ouvertes</h2>
      <h4><a href=''>Adresses extraites du cadastre</a></h4>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum dignissim, lacus eget ullamcorper vehicula, nisl elit fringilla orci, posuere dictum massa justo ut metus. Donec ac dapibus justo.
      </p>

      <h4><a href=''>Adresses FTTH</a></h4>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin id imperdiet dolor, quis malesuada sem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
      </p>

      <h4><a href=''>Adresses FTTH</a></h4>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vestibulum tincidunt elit, vel malesuada metus laoreet vel. Aliquam at metus mauris. In hac habitasse platea dictumst. Cras non nulla lectus. Nullam mollis facilisis diam, vitae rhoncus sem tincidunt vel.
      </p>

    </Section>
    <style jsx>{`
      .cards {
        display: flex;
        justify-content: space-between;
        flex-flow: wrap;
      }
    `}</style>
  </Page>
)
