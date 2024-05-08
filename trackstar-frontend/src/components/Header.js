import { Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Header = () => {
  const user = useSelector((state) => state.user)
  return (
    <header>
      <div id="headerDiv">
        <Navbar collapseOnSelect expand="lg" variant="dark" className="navBar">
          <Navbar.Brand as={Link} to="/" className="navBrand">
            TRACKSTAR
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav>
              <Nav.Link href="#" as="span" className="nav-item">
                <Link to="/markets" className="nav-link">
                  Markets
                </Link>
              </Nav.Link>
              <Nav.Link href="#" as="span" className="nav-item">
                <Link to="/favorites" className="nav-link">
                  Favorites
                </Link>
              </Nav.Link>
              <Nav.Link href="#" as="span">
                {user ? (
                  <Link to="/logout" className="nav-link">
                    logout
                  </Link>
                ) : (
                  <Link to="/login" className="nav-link">
                    login
                  </Link>
                )}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </header>
  )
}

export default Header
