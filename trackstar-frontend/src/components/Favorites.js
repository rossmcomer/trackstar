import React from 'react'
import axios from 'axios'
import '../App.css'
import Modal from 'react-modal'
import { useDispatch, useSelector } from 'react-redux'
import { createFavorite, removeFavorite } from '../reducers/favorites'
import { notify } from '../reducers/notification'
import MarketsTable from './MarketsTable'
import useCryptoList from '../hooks/useCryptoList'

const Favorites = () => {
  const dispatch = useDispatch()
  const favorites = useSelector((state) => state.favorites)
  const user = useSelector((state) => state.user)

  const fetchFavoriteData = async () => {
    const favoriteIds = favorites.map((favorite) => favorite.coingeckoId)
    const coinListResponse = await axios.get('https://api.coingecko.com/api/v3/coins/list')
    const coinList = coinListResponse.data
    const favoriteCoins = coinList.filter((coin) => favoriteIds.includes(coin.id)).map((coin) => coin.id)

    if (favoriteCoins.length > 0) {
      const marketDataResponse = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
        params: { vs_currency: 'usd', ids: favoriteCoins.join(',') },
      })
      return marketDataResponse.data
    }
    return []
  }

  const { cryptos, visible, modalIsOpen, openModal, closeModal, loadMore } =
    useCryptoList(fetchFavoriteData, [favorites])

  const addToFavorites = (id) => {
    if (!favorites.map((fav) => fav.coingeckoId).includes(id)) {
      dispatch(createFavorite(id))
      dispatch(notify(`${id} added to Favorites`, 'success', 10))
    } else {
      dispatch(removeFavorite(id))
      dispatch(notify(`${id} removed from Favorites`, 'success', 10))
    }
  }

  if (favorites.length < 1) {
    return (
      <div id="noFavoritesContainer">
        <div id="noFavorites">No favorites to display! Add a favorite to get started!</div>
      </div>
    )
  }

  return (
    <div className="MarketsContainer" style={{ marginTop: user === null ? '150px' : '20px' }}>
      {user ? (
        <div className="TableContainer">
          <MarketsTable cryptos={cryptos} visible={visible} addToFavorites={addToFavorites} favorites={favorites} openModal={openModal} />
          <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Crypto Chart" className="Modal" overlayClassName="Overlay">
            <div id="cryptoChart"></div>
            <div id="chartBtnContainer">
              <button onClick={closeModal} id="chartBtn">Close</button>
            </div>
          </Modal>
        </div>
      ) : (
        <div id="pleaseLoginContainer">
          <div id="pleaseLoginNotice">Please log in to use this feature.</div>
        </div>
      )}
      {visible < cryptos.length && <button onClick={loadMore} className="load-more-button">Load More</button>}
    </div>
  )
}

export default Favorites