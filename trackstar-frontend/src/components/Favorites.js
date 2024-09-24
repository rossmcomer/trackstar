import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../App.css'
import Modal from 'react-modal'
import { useDispatch, useSelector } from 'react-redux'
import { createFavorite, removeFavorite } from '../reducers/favorites'
import { notify } from '../reducers/notification'
import MarketsTable from './MarketsTable'
import { fetchModalData } from '../util/fetchModalData'

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

    fetchModalData(selectedCrypto)
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
    <div
      className="MarketsContainer"
      style={{ marginTop: user === null ? '150px' : '20px' }}
    >
      {user ? (
        <div className="TableContainer">
          <MarketsTable
            cryptos={cryptos}
            visible={visible}
            addToFavorites={addToFavorites}
            favorites={favorites}
            openModal={openModal}
            loadMore={loadMore}
          />
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
