import { useSelector } from 'react-redux'
import { Toaster } from 'react-hot-toast'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  if (!notification) {
    return
  }

  return <Toaster />
}

export default Notification
