import React, { useState, useEffect } from "react"
import RestaurantDataService from "../src/services/services.js"
import { Link } from "react-router-dom"
import Loader from "react-js-loader"

const RestaurantsList = () => {
  const [restaurants, setRestaurants] = useState([])
  const [searchName, setSearchName] = useState("")
  const [searchZip, setSearchZip] = useState("")
  const [searchCuisine, setSearchCuisine] = useState("")
  const [loader, setLoader] = useState(false)

  useEffect(() => {
    retrieveRestaurants()
  }, [])

  const retrieveRestaurants = () => {
    setLoader(true)
    RestaurantDataService.getAll()
      .then(response => {
        setRestaurants(response.data.restaurants)
        setTimeout(() => {
          setLoader(false) // Hide loader after 2 seconds
        }, 500)
      })
      .catch(e => {
        console.log(e)
        setLoader(false) // Hide loader after 2 seconds
      })
  }
  const onChangeSearchName = e => {
    const searchName = e.target.value
    setSearchName(searchName)
  }

  const onChangeSearchZip = e => {
    const searchZip = e.target.value
    setSearchZip(searchZip)
  }

  const onChangeSearchCuisine = e => {
    const searchCuisine = e.target.value
    setSearchCuisine(searchCuisine)
  }
  const find = (query, by) => {
    RestaurantDataService.find(query, by)
      .then(response => {
        console.log(response.data)
        setRestaurants(response.data.restaurants)
      })
      .catch(e => {
        console.log(e)
      })
  }
  const findByName = () => {
    setLoader(true)
    find(searchName, "name")
    setTimeout(() => {
      setLoader(false) // Hide loader after 2 seconds
    }, 300)
    setSearchName("")
  }

  const findByZip = () => {
    setLoader(true)
    find(searchZip, "zipcode")
    setSearchZip("")
    setTimeout(() => {
      setLoader(false) // Hide loader after 2 seconds
    }, 300)
  }
  const findByCuisine = () => {
    setLoader(true)
    find(searchCuisine, "cuisine")
    setSearchCuisine("")
    setTimeout(() => {
      setLoader(false) // Hide loader after 2 seconds
    }, 300)
  }

  return (
    <div className="container">
      <h1 className="mt-5 text-uppercase text-center ">Restaurants</h1>
      <hr />
      <div className="container ">
        <div className="row ">
          <div className="col-md-4">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search by name"
                aria-label="Search by name"
                aria-describedby="basic-addon1"
                value={searchName}
                onChange={onChangeSearchName}
              />
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={findByName}
              >
                Search
              </button>
            </div>
          </div>
          <div className="col-md-4">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search by zipcode"
                aria-label="Search by zipcode"
                aria-describedby="basic-addon2"
                value={searchZip}
                onChange={onChangeSearchZip}
              />
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={findByZip}
              >
                Search
              </button>
            </div>
          </div>
          <div className="col-md-4">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search by cuisine"
                aria-label="Search by cuisine"
                aria-describedby="basic-addon3"
                value={searchCuisine}
                onChange={onChangeSearchCuisine}
              />
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={findByCuisine}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
      <hr />
      {loader ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "50vh" }}
        >
          <Loader
            type="spinner-default"
            bgColor="black"
            color="black"
            size={100}
          />
        </div>
      ) : (
        <div className="row mt-5">
          {restaurants.length > 0 ? (
            restaurants.map((restaurant, index) => {
              const address = `${restaurant.address.building} ${restaurant.address.street}, ${restaurant.address.zipcode}`
              return (
                <div className="col-md-4" key={index}>
                  <div className="card mb-3 text-center">
                    <div className="card-body">
                      <h5 className="card-title">{restaurant.name}</h5>
                      <footer className="blockquote-footer mt-2">
                        <strong>Cuisine:</strong>{" "}
                        <cite title="Source Title">{restaurant.cuisine}</cite>
                      </footer>
                      <footer className="blockquote-footer">
                        <strong>Address:</strong>{" "}
                        <cite title="Source Title">{address}</cite>
                      </footer>
                      <div className="row justify-content-center">
                        <Link
                          to={"/restaurants/" + restaurant._id}
                          className="btn btn-primary col-5 mx-1 mb-1"
                        >
                          Reviews
                        </Link>
                        <a
                          className="btn btn-primary col-5 mx-1 mb-1"
                          target="_blank"
                          rel="noreferrer"
                          href={"https://www.google.com/maps/place/" + address}
                        >
                          Map
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          ) : (
            <div className="col-sm-12 text-center">
              <p>Start the Backend</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default RestaurantsList
