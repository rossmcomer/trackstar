import { Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Header = ({ user }) => (
  <header>
    <div id="headerDiv">
      <Navbar collapseOnSelect expand="lg" variant="light" className="navBar">
        <Navbar.Brand to="/" className="navBrand">
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
            <Nav.Link href="#" as="span" className="nav-item">
              <Link to="/sentiment" className="nav-link">
                Sentiment
              </Link>
            </Nav.Link>
            <Nav.Link href="#" as="span" className="nav-item">
              <Link to="/contact" className="nav-link">
                Contact
              </Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              {user ? (
                <em>Logged in as {user}</em>
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

export default Header
