import React from 'react'

const MarketsTable = ({
  cryptos,
  visible,
  addToFavorites,
  favorites,
  openModal,
}) => {
  console.log(cryptos)
  return (
    <table className="marketsTable">
      <thead>
        <tr id="marketsHeader">
          <th colSpan="2">Ticker</th>
          <th>Price</th>
          <th>24hr Change%</th>
          <th>Favorite</th>
          <th>View Chart</th>
          <th>Market Cap</th>
          <th>Volume</th>
        </tr>
      </thead>
      <tbody>
        {cryptos.slice(0, visible).map((crypto) => (
          <tr key={crypto.id} className="cryptoRow">
            <td>
              <a href={`https://www.coingecko.com/en/coins/${crypto.id.toLowerCase()}`} rel="coingeckopage">
                <img src={crypto.image} alt="Logo" width="20px" />
              </a>
            </td>
            <td>
              <a href={`https://www.coingecko.com/en/coins/${crypto.id.toLowerCase()}`} rel="coingeckopage" className="coinGeckoLink">
                {crypto.symbol.toUpperCase()}
              </a>
            </td>
            <td>${crypto.current_price.toLocaleString()}</td>
            <td>{crypto.price_change_percentage_24h.toFixed(2)}%</td>
            <td>
              <button id="favBtn" onClick={() => addToFavorites(crypto.id)}>
                {favorites.map((fav) => fav.coingeckoId).includes(crypto.id)
                  ? '★'
                  : '☆'}
              </button>
            </td>
            <td>
              <button onClick={() => openModal(crypto)} id="viewChartBtn">
                View
              </button>
            </td>
            <td>${crypto.market_cap.toLocaleString()}</td>
            <td>${crypto.total_volume.toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default MarketsTable
