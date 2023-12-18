import React from "react"
import { Routes, Route, Link } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import { Navbar, Nav } from "react-bootstrap"
import { RestaurantsLists, Login, Restaurants, AddReview } from "../components"
import "./App.css"

const App = () => {
  const [user, setUser] = React.useState(null)

  return (
    <div>
      <Navbar className="navbar navbar-expand navbar-dark bg-dark">
        <Navbar.Brand>Restaurant Reviews</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Item>
              <Link to="/" className="nav-link active" aria-current="page">
                Restaurants
              </Link>
            </Nav.Item>
            {user ? (
              <Nav.Item>
                <Link
                  to="/restaurants"
                  className="nav-link active"
                  aria-current="page"
                >
                  Logout {user.name}
                </Link>
              </Nav.Item>
            ) : (
              <Nav.Item>
                <Link
                  to="/login"
                  className="nav-link active"
                  aria-current="page"
                >
                  Login
                </Link>
              </Nav.Item>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <div className="container mt-3">
        <Routes>
          <Route exact path="/" element={<RestaurantsLists />} />
          <Route path="/restaurants/:id" element={<Restaurants />} />
          <Route path="/restaurants/:id/review" element={<AddReview />} />
          <Route path="/login" element={<Login />} />
          {/* Add other routes here */}
        </Routes>
      </div>
    </div>
  )
}

export default App
