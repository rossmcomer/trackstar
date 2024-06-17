import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { notify } from '../reducers/notification'
import { initializeFavorites } from '../reducers/favorites'
import { initUser, clearUser } from '../reducers/user'

export const useNotification = () => {
  const dispatch = useDispatch()

  return (message, type) => {
    dispatch(notify(message, type, 10))
  }
}

export const useInitialization = () => {
  const dispatch = useDispatch()

  return async () => {
    await dispatch(initUser())
    dispatch(initializeFavorites())
  }
}

export const useClearUser = () => {
  const dispatch = useDispatch()

  return () => {
    dispatch(clearUser())
  }
}

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  return {
    reset,
    fields: {
      type,
      value,
      onChange,
    },
  }
}
