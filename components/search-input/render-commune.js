import React from 'react'
import theme from '../../styles/theme'

function RenderCommune(item, isHighlighted) {
  const description = item.departement ? `${item.departement.nom} - ${item.departement.code}` : 'Collectivité d’outre-mer'

  return (
    <div key={item.code} className={`item ${isHighlighted ? 'item-highlighted' : ''}`}>
      <div>
        <div className='item-label'>{item.nom}</div>
      </div>
      <div>{description}</div>
      <style jsx>{`
        .item {
          display: flex;
          flex-flow: row;
          justify-content: space-between;
          align-items: center;
          padding: 1em;
          border-bottom: 1px solid whitesmoke;
        }

        .item .item-label {
          font-weight: 600;
        }

        .item:hover {
          cursor: pointer;
        }

        .item-highlighted {
          background-color: ${theme.primary};
          color: ${theme.colors.white};
        }
      `}</style>
    </div>
  )
}

export default RenderCommune
