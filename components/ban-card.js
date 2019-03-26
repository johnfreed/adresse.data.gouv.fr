import React from 'react'
import PropTypes from 'prop-types'
import FaCheck from 'react-icons/lib/fa/check'
import FaClose from 'react-icons/lib/fa/close'
import FaExclamationTriangle from 'react-icons/lib/fa/exclamation-triangle'

import theme from '../styles/theme'

import ButtonLink from './button-link'

class BanCard extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    tagline: PropTypes.string,
    producer: PropTypes.string.isRequired,
    licence: PropTypes.string.isRequired,
    updateFreq: PropTypes.string.isRequired,
    lastUpdate: PropTypes.object.isRequired,
    addresses: PropTypes.string.isRequired,
    certAddresses: PropTypes.string,
    sources: PropTypes.object.isRequired,
    millesime: PropTypes.string.isRequired,
    label: PropTypes.bool.isRequired,
    link: PropTypes.string.isRequired,
    focus: PropTypes.bool
  }

  static defaultProps = {
    tagline: null,
    certAddresses: null,
    focus: false
  }

  render() {
    const {title, producer, licence, addresses, certAddresses, sources, lastUpdate, updateFreq, millesime, label, tagline, focus, link} = this.props
    const oneWeekAgo = new Date()
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

    return (
      <div className='card-container'>

        {tagline && (
          <p className='tagline'>{tagline}</p>
        )}

        <div className='card'>
          <div className='header'>
            <h3>{title}</h3>
            <div className='hr' />
          </div>

          <div>
            <div className='section'>
              <div>Producteur</div>
              <b>{producer}</b>
            </div>

            <div className='section'>
              <div>licence</div>
              <b>{licence}</b>
            </div>

            <div className='section'>
              <div>Nombre d’adresses réelles</div>
              <b>{addresses}</b>
            </div>

            <div className='section'>
              <div>Nombre d’adresses certifiées</div>
              <b>{certAddresses || '-'}</b>
            </div>

            <div className='section'>
              <div>Fréquence de mise à jour</div>
              <b>{updateFreq} {title === 'Base Adresse Nationale' && (
                <FaExclamationTriangle color='#fed500' />
              )}</b>
            </div>

            <div className='section'>
              <div>Millésime du COG</div>
              <b>{millesime}</b>
            </div>

            <div className='section'>
              <div>
                Libellés AFNOR et d’acheminement
              </div>
              <div>{label ? (
                <FaCheck color={theme.colors.green} />
              ) : (
                <FaClose color={theme.colors.red} />
              )}</div>
            </div>
          </div>

          <div className='sources-container'>
            <div>Source{sources.length > 1 ? 's' : ''}</div>
            <div className='sources'>
              {Object.keys(sources).map(key => (
                <div className='source' key={`${title}-${key}`}>
                  <a href={sources[key]}>{key}</a>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className='download'>
          <ButtonLink href={link}>Accéder aux données</ButtonLink>
        </div>

        <div className='update'>
          <div>Dernière mise à jour :</div>
          {lastUpdate > oneWeekAgo ? (
            <b>{lastUpdate.toLocaleDateString()} ✨</b>
          ) : (
            <div style={{marginBottom: '8px'}}>{lastUpdate.toLocaleDateString()}</div>
          )}
        </div>

        <style jsx>{`
          .card-container {
            display: flex;
            flex: 1;
            flex-direction: column;
            width: 30%;
            min-width: 275px;
            margin: 1em;
          }

          .update {
            text-align: center;
            margin: 1em;
          }

          .card {
            width: 100%;
            margin-bottom: 1em;
            border: none;
            border-radius: 2px;
            text-align: center;
            box-shadow: 0 1px 4px 0 ${focus ? theme.primaryDark : theme.boxShadow};
          }

          .card:hover {
            border: 1px solid ${theme.boxShadow};
            margin: -1px 0 -1px;
          }

          .hr {
            margin: 0 auto;
            border-bottom: 2px solid ${theme.primary};
            width: 80%;
          }

          .section {
            margin: 1em 0;
          }

          .tagline {
            font-style: italic;
            font-size: 14px;
            text-align: center;
            height: 40px;
          }

          .sources-container {
            display: flex;
            align-items: center;
            justify-content: center;
            background: ${theme.colors.lighterGrey};
            padding: 0.5em 1em;
          }

          .sources {
            display: flex;
            flex-flow: wrap;
            justify-content: flex-start;
            margin: 0 1em;
          }

          .source {
            display: flex;
            align-items: center;
            padding: 2px 4px;
            margin: 2px;
            background: ${theme.primaryDark};
            border-radius: 2px;
            font-size: smaller;
          }

          .source a {
            color: #fff;
          }

          .source:hover {
            background: ${theme.primary};
          }

          .download {
            align-self: center;
            margin: auto 0 0;
          }
      `}</style>
      </div>
    )
  }
}

export default BanCard
