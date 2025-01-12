import React from 'react'
import FaTerminal from 'react-icons/lib/fa/terminal'
import Page from '../layouts/main'

import theme from '../styles/theme'

import Head from '../components/head'
import Section from '../components/section'

const title = 'API'
const description = 'Avec l’API d’adresse.data.gouv.fr, embarquez directement les données ouvertes dans votre application.'

export default () => (
  <Page title={title} description={description}>
    <Head title={title} icon={<FaTerminal />} />

    <Section>
      <div className='entrypoint' id='search'>
        <div className='row'>
          <div className='description'>
            <h2>/search/</h2>
            <p>Point d’entrée pour le géocodage.</p>
          </div>
          <div className='details'>
            <p>Utiliser le paramètre <b>q</b> pour faire une recherche plein texte:</p>
            <pre><code>curl https://api-adresse.data.gouv.fr/search/?q=8+bd+du+port</code></pre>
            <p>Avec <b>limit</b> on peut contrôler le nombre d’éléments retournés:</p>
            <pre><code>curl "https://api-adresse.data.gouv.fr/search/?q=8+bd+du+port&limit=15"</code></pre>
            <p>Avec <b>autocomplete</b> on peut désactiver les traitements d’auto-complétion:</p>
            <pre><code>curl "https://api-adresse.data.gouv.fr/search/?q=8+bd+du+port&autocomplete=0"</code></pre>
            <p>Avec <b>lat</b> et <b>lon</b> on peut donner une priorité géographique:</p>
            <pre><code>curl "https://api-adresse.data.gouv.fr/search/?q=8+bd+du+port&lat=48.789&lon=2.789"</code></pre>
            <p>Les filtres <b>type</b>, <b>postcode</b> (code Postal) et <b>citycode</b> (code INSEE) permettent de restreindre la recherche:</p>
            <pre><code>curl "https://api-adresse.data.gouv.fr/search/?q=8+bd+du+port&postcode=44380"</code></pre>
            <pre><code>curl "https://api-adresse.data.gouv.fr/search/?q=paris&type=street"</code></pre>
            <p>Le retour est un geojson <i>FeatureCollection</i> respectant la spec <a href='https://github.com/yohanboniface/geocodejson-spec'>GeoCodeJSON</a>:</p>
            <pre>
              <code>{`{
  "attribution": "BAN",
  "licence": "ODbL 1.0",
  "query": "8 bd du port",
  "type": "FeatureCollection",
  "version": "draft",
  "features": [
    {
      "properties": {
        "context": "80, Somme, Picardie",
        "housenumber": "8",
        "label": "8 Boulevard du Port 80000 Amiens",
        "postcode": "80000",
        "citycode": "80021",
        "id": "ADRNIVX_0000000260875032",
        "score": 0.3351181818181818,
        "name": "8 Boulevard du Port",
        "city": "Amiens",
        "type": "housenumber"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          2.29009,
          49.897446
        ]
      },
      "type": "Feature"
    },
    {
      "properties": {
        "context": "34, H\u00E9rault, Languedoc-Roussillon",
        "housenumber": "8",
        "label": "8 Boulevard du Port 34140 M\u00E8ze",
        "postcode": "34140",
        "citycode": "34157",
        "id": "ADRNIVX_0000000284423783",
        "score": 0.3287575757575757,
        "name": "8 Boulevard du Port",
        "city": "M\u00E8ze",
        "type": "housenumber"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          3.605875,
          43.425232
        ]
      },
      "type": "Feature"
    }
  ]
}`}
              </code>
            </pre>
            <p>Les attributs retournés sont :</p>
            <ul>
              <li><em>id</em> : identifiant de l’adresse (non stable: actuellement identifiant IGN)</li>
              <li><em>type</em> : type de résultat trouvé</li>
              <ul>
                <li><em>housenumber</em> : numéro « à la plaque »</li>
                <li><em>street</em> : position « à la voie », placé approximativement au centre de celle-ci</li>
                <li><em>locality</em> : lieu-dit</li>
                <li><em>municipality</em> : numéro « à la commune »</li>
              </ul>
              <li><em>score</em> : valeur de 0 à 1 indiquant la pertinence du résultat</li>
              <li><em>housenumber</em> : numéro avec indice de répétition éventuel (bis, ter, A, B)</li>
              <li><em>name</em> : numéro éventuel et nom de voie ou lieu dit</li>
              <li><em>postcode</em> : code postal</li>
              <li><em>citycode</em> : code INSEE de la commune</li>
              <li><em>city</em> : nom de la commune</li>
              <li><em>context</em> : n° de département, nom de département et de région</li>
              <li><em>label</em> : libellé complet de l’adresse</li>
            </ul>
          </div>
        </div>
      </div>
      <div className='entrypoint' id='reverse'>
        <div className='row'>
          <div className='description'>
            <h2>/reverse/</h2>
            <p>Point d’entrée pour le géocodage inverse.</p>
          </div>
          <div className='details'>
            <p>Les paramètres <b>lat</b> et <b>lon</b> sont obligatoires:</p>
            <pre><code>curl "https://api-adresse.data.gouv.fr/reverse/?lon=2.37&lat=48.357"</code></pre>
            <p>Le paramètre <b>type</b> permet forcer le type de retour:</p>
            <pre><code>curl "https://api-adresse.data.gouv.fr/reverse/?lon=2.37&lat=48.357&type=street"</code></pre>
            <p>Même format de réponse que pour le point d’entrée <a href='#search'><b>/search/</b></a>.</p>
          </div>
        </div>
      </div>
      <div className='entrypoint' id='csv-search'>
        <div className='row'>
          <div className='description'>
            <h2>/search/csv/</h2>
            <p>Point d’entrée pour le géocodage de masse à partir d’un fichier CSV.</p>
          </div>
          <div className='details'>
            <p>Le fichier csv, encodé en UTF-8 et limité actuellement à 8Mo, doit être passé via le paramètre <b>data</b>. Veuillez noter l'arobase après <b>data=</b>.</p>
            <pre><code>curl -X POST -F data=@path/to/file.csv https://api-adresse.data.gouv.fr/search/csv/</code></pre>
            <p>Par défaut, toutes les colonnes sont concaténées pour constituer l’adresse qui sera géocodée. On peut définir les colonnes à utiliser via de multiples paramètres <b>columns</b>:</p>
            <pre><code>curl -X POST -F data=@path/to/file.csv -F columns=voie -F columns=ville https://api-adresse.data.gouv.fr/search/csv/</code></pre>
            <p>Il est possible de préciser le nom d’une colonne contenant le <b>code INSEE</b> ou le <b>code Postal</b> pour limiter les recherches, exemple :</p>
            <pre><code>curl -X POST -F data=@path/to/file.csv -F columns=voie -F columns=ville -F citycode=ma_colonne_code_insee https://api-adresse.data.gouv.fr/search/csv/</code></pre>
            <pre><code>curl -X POST -F data=@path/to/file.csv -F columns=voie -F columns=ville -F postcode=colonne_code_postal https://api-adresse.data.gouv.fr/search/csv/</code></pre>
            <p>On peut utiliser le fichier <a href="https://adresse.data.gouv.fr/static/exemples/search.csv">https://adresse.data.gouv.fr/static/exemples/search.csv</a> comme exemple.</p>
            <pre><code>curl -X POST -F data=@search.csv -F columns=adresse -F columns=postcode https://api-adresse.data.gouv.fr/search/csv/</code></pre>
          </div>
        </div>
      </div>
      <div className='entrypoint' id='csv-reverse'>
        <div className='row'>
          <div className='description'>
            <h2>/reverse/csv/</h2>
            <p>Point d’entrée pour le géocodage inverse de masse à partir d’un fichier CSV.</p>
          </div>
          <div className='details'>
            <p>Le fichier csv, encodé en UTF-8 et limité actuellement à 8Mo, doit être passé via le paramètre <b>data</b>. Il doit contenir les colonnes <b>latitude</b> (ou <em>lat</em>) et <b>longitude</b> (ou <em>lon</em> ou <em>lng</em>).</p>
            <pre><code>curl -X POST -F data=@path/to/file.csv https://api-adresse.data.gouv.fr/reverse/csv/</code></pre>
            <p>On peut utiliser le fichier <a href="https://adresse.data.gouv.fr/static/exemples/reverse.csv">https://adresse.data.gouv.fr/static/exemples/reverse.csv</a> comme exemple.</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .entrypoint + .entrypoint {
          border-top: 1px solid ${theme.borderLighter};
        }

        .row {
          display: flex;
          flex-flow: wrap;
          justify-content: space-between;
          padding: 40px 0;
        }

        .details {
          background-color: ${theme.colors.almostBlack};
          color: ${theme.colors.white};
          padding: 40px;
          border: 1px solid ${theme.darkGrey};
          border-radius: ${theme.borderRadius};
          box-shadow: 0 1px 4px 0 ${theme.boxShadow};
          width: 100%;
        }

        .details code {
          color: ${theme.darkText};
        }

        @media (min-width: 900px) {
          .row {
            flex-flow: row;
          }

          .details {
            width: 70%;
          }

          .description {
            width: 25%;
          }
        }
      `}</style>
    </Section>
  </Page>
)
