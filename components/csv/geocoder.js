import React from 'react'
import PropTypes from 'prop-types'

import geocodeMany from '../../lib/geocode/many'

import Button from '../button'
import Loader from '../loader'

function geocodedFileName(originalFileName = 'file') {
  if (originalFileName.toLowerCase().endsWith('.csv')) {
    originalFileName = originalFileName.substr(0, originalFileName.length - 4)
  }

  return originalFileName + '.geocoded.csv'
}

class Geocoder extends React.Component {
  static propTypes = {
    file: PropTypes.object.isRequired,
    columns: PropTypes.array.isRequired,
    encoding: PropTypes.string.isRequired,
    filter: PropTypes.string
  }

  static defaultProps = {
    filter: null
  }

  state = {
    status: null,
    blob: null,
    error: null
  }

  handleGeocodeClick = async () => {
    const {file, columns, filter, encoding} = this.props
    const filters = []

    if (filter) {
      filters.push({
        name: 'citycode',
        value: filter
      })
    }

    this.setState({status: 'pending'})

    try {
      const blob = await geocodeMany(file, encoding, filters, columns)
      this.setState({
        status: 'done',
        blob
      })
    } catch (error) {
      this.setState({
        status: null,
        error
      })
    }
  }

  render() {
    const {status, blob, error} = this.state
    const {file} = this.props

    return (
      <div className='geocoder'>
        {!status && (
          <Button onClick={this.handleGeocodeClick}>Lancer le géocodage</Button>
        )}

        {status === 'pending' && (
          <Button>
            <div className='col'>
              En cours de géocodage…
              <Loader size='small' />
            </div>
          </Button>
        )}

        {status === 'done' && (
          <a href={URL.createObjectURL(blob)} download={geocodedFileName(file.name)}>
            <Button>Télécharger</Button>
          </a>
        )}

        {error && (
          <p className='error'>Une erreur est survenue: {error.message}</p>
        )}

        <style jsx>{`
          .geocoder {
            margin: 2em 0;
            text-align: center;
          }

          .col {
            display: flex;
            align-items: center;
          }

          .error {
            color: red;
          }
        `}</style>
      </div>
    )
  }
}

export default Geocoder
