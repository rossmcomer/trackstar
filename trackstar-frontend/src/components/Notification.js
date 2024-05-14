import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  if (!notification) {
    return
  }

  const style = {
    color: notification.type === 'error' ? 'red' : 'green',
    fontSize: 14,
    margin: 10,
    minWidth: 240,
  }

  return <div style={style}>{notification.message}</div>
}

export default Notification
