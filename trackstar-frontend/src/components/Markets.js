import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../App.css'
import Modal from 'react-modal'
import ApexCharts from 'apexcharts'
import { useDispatch, useSelector } from 'react-redux'
import { createFavorite, removeFavorite } from '../reducers/favorites'
import { notify } from '../reducers/notification'
import MarketsTable from './MarketsTable'

const Markets = () => {
  const dispatch = useDispatch()
  const [cryptos, setCryptos] = useState([])
  const [visible, setVisible] = useState(10)
  const favorites = useSelector((state) => state.favorites)
  const user = useSelector((state) => state.user)
  const [modalIsOpen, setIsOpen] = useState(false)
  const [selectedCrypto, setSelectedCrypto] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(
          'https://api.coingecko.com/api/v3/search/trending',
        )
        const trendingCoins = result.data.coins.map((coin) => coin.item.id)
        if (trendingCoins.length > 0) {
          const marketDataResponse = await axios.get(
            'https://api.coingecko.com/api/v3/coins/markets',
            {
              params: {
                vs_currency: 'usd',
                ids: trendingCoins.join(','),
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
  }, [])

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
          grid: {
            borderColor: '#000000',
            xaxis: {
              lines: {
                show: true,
                color: '#1c19ec',
              }
            }
          },
          stroke: {
            colors: ['#1c19ec']
          },
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
              gradientToColors: ['#1c19ec']
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
    if (user) {
      if (!favorites.map((fav) => fav.coingeckoId).includes(id)) {
        dispatch(createFavorite(id))
        dispatch(notify(`${id} added to Favorites`, 'success', 10))
      } else {
        dispatch(removeFavorite(id))
        dispatch(notify(`${id} removed from Favorites`, 'success', 10))
      }
    } else {
      dispatch(notify('Please log in to use this feature', 'error', 10))
    }
  }

  const loadMore = () => {
    setVisible((prevValue) => prevValue + 20)
  }

  return (
    <div className="MarketsContainer" style={{ marginTop: user === null ? '150px' : '20px' }}>
      <div className="TableContainer">
        <MarketsTable
          cryptos={cryptos}
          visible={visible}
          addToFavorites={addToFavorites}
          favorites={favorites}
          openModal={openModal}
          loadMore={loadMore}
        />
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
      {visible < cryptos.length && (
        <button onClick={loadMore} className="load-more-button">
          Load More
        </button>
      )}
    </div>
  )
}

export default Markets
