import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../App.css'
import Modal from 'react-modal'
import ApexCharts from 'apexcharts'
import { useDispatch, useSelector } from 'react-redux'
import { createFavorite, removeFavorite } from '../reducers/favorites'
import { notify } from '../reducers/notification'

const Favorites = () => {
  const dispatch = useDispatch()
  const [cryptos, setCryptos] = useState([])
  const [visible, setVisible] = useState(10)
  const [modalIsOpen, setIsOpen] = useState(false)
  const [selectedCrypto, setSelectedCrypto] = useState(null)
  const favorites = useSelector((state) => state.favorites)
  const user = useSelector((state) => state.user)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const favoriteIds = favorites.map((favorite) => favorite.coingeckoId)
        const coinListResponse = await axios.get(
          'https://api.coingecko.com/api/v3/coins/list',
        )
        const coinList = coinListResponse.data
        const favoritecoins = coinList
          .filter((coin) => favoriteIds.includes(coin.id))
          .map((coin) => coin.id)
        if (favoritecoins.length > 0) {
          const marketDataResponse = await axios.get(
            'https://api.coingecko.com/api/v3/coins/markets',
            {
              params: {
                vs_currency: 'usd',
                ids: favoritecoins.join(','),
              },
            },
          )

          setCryptos(marketDataResponse.data)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [favorites])

  const openModal = (crypto) => {
    setIsOpen(true)
    setSelectedCrypto(crypto)
  }

  const closeModal = () => {
    setIsOpen(false)
    setSelectedCrypto(null)
  }

  useEffect(() => {
    if (!modalIsOpen || !selectedCrypto) return

    const fetchModalData = async () => {
      try {
        const result = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${selectedCrypto.id}/market_chart?vs_currency=usd&days=90`,
        )

        const prices = result.data.prices

        let options = {
          series: [
            {
              name: `${selectedCrypto.symbol.toUpperCase()}/USD`,
              data: prices.map((price) => [
                new Date(price[0]).getTime(),
                price[1],
              ]),
            },
          ],
          chart: {
            type: 'area',
            stacked: false,
            height: 350,
            zoom: {
              type: 'x',
              enabled: true,
              autoScaleYaxis: true,
            },
            toolbar: {
              autoSelected: 'zoom',
            },
          },
          title: {
            text: `${selectedCrypto.name}`,
            align: 'left',
          },
          dataLabels: {
            enabled: false,
          },
          markers: {
            size: 0,
          },
          fill: {
            type: 'gradient',
            gradient: {
              shadeIntensity: 1,
              inverseColors: false,
              opacityFrom: 0.5,
              opacityTo: 0,
              stops: [0, 90, 100],
            },
          },
          yaxis: {
            labels: {
              formatter: function (val) {
                return val.toFixed(2)
              },
            },
            title: {
              text: 'Price/USD',
            },
          },
          xaxis: {
            type: 'datetime',
          },
          tooltip: {
            shared: true,
            y: {
              formatter: function (val) {
                return val.toFixed(4)
              },
            },
          },
        }
        const chart = new ApexCharts(
          document.querySelector('#cryptoChart'),
          options,
        )
        chart.render()
      } catch (error) {
        console.error('Error fetching historical data:', error)
      }
    }

    fetchModalData()
  }, [modalIsOpen, selectedCrypto])

  const addToFavorites = (id) => {
    if (!favorites.map((fav) => fav.coingeckoId).includes(id)) {
      dispatch(createFavorite(id))
      dispatch(notify(`${id} added to Favorites`, 'success', 10))
    } else {
      dispatch(removeFavorite(id))
      dispatch(notify(`${id} removed from Favorites`, 'success', 10))
    }
  }

  const loadMore = () => {
    setVisible((prevValue) => prevValue + 20)
  }

  if (favorites.length < 1) {
    return (
      <div id="noFavoritesContainer">
        <div id="noFavorites">
          No favorites to display! Add a favorite to get started!
        </div>
      </div>
    )
  }

  return (
    <div className="MarketsContainer">
      {user ? (
        <div className="TableContainer">
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
                    <img src={crypto.image} alt="Logo" width="20px"></img>
                  </td>
                  <td>{crypto.symbol.toUpperCase()}</td>
                  <td>${crypto.current_price.toLocaleString()}</td>
                  <td>{crypto.price_change_percentage_24h.toFixed(2)}%</td>
                  <td>
                    <button
                      id="favBtn"
                      onClick={() => addToFavorites(crypto.id)}
                    >
                      {favorites
                        .map((fav) => fav.coingeckoId)
                        .includes(crypto.id)
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
          {visible < cryptos.length && (
            <button onClick={loadMore} className="load-more-button">
              Load More
            </button>
          )}
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Crypto Chart"
            className="Modal"
            overlayClassName="Overlay"
          >
            <div id="cryptoChart"></div>
            <div id="chartBtnContainer">
              <button onClick={closeModal} id="chartBtn">
                Close
              </button>
            </div>
          </Modal>
        </div>
      ) : (
        <div id="pleaseLoginContainer">
          <div id="pleaseLoginNotice">Please log in to use this feature.</div>
        </div>
      )}
    </div>
  )
}

export default Favorites
