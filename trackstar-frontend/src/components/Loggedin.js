import { useSelector } from 'react-redux'

const Loggedin = () => {
  const user = useSelector(state => state.user)

  if (!user) {
    return
  }

  return <em id="loggedInNotice">Signed in as {user.username}</em>
}

export default Loggedin