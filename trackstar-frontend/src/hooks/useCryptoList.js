import { useState, useEffect, useMemo } from 'react'
import { fetchModalData } from '../util/fetchModalData'

const useCryptoList = (fetchDataFunction, dependencies = []) => {
  const [cryptos, setCryptos] = useState([])
  const [visible, setVisible] = useState(10)
  const [modalIsOpen, setIsOpen] = useState(false)
  const [selectedCrypto, setSelectedCrypto] = useState(null)

  const fetchData = useMemo(() => {
    return async () => {
      try {
        const data = await fetchDataFunction()
        setCryptos(data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
  }, dependencies)

  useEffect(() => {
    fetchData()
  }, [fetchData])

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

  const loadMore = () => {
    setVisible((prevValue) => prevValue + 20)
  }

  return {
    cryptos,
    visible,
    modalIsOpen,
    selectedCrypto,
    openModal,
    closeModal,
    loadMore,
    setVisible,
  }
}

export default useCryptoList
