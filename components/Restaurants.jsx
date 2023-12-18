import React, { useState, useEffect } from "react"
import RestaurantDataService from "../src/services/services.js"
import { Link, useParams } from "react-router-dom"
import { MdDeleteOutline, MdModeEdit } from "react-icons/md"

const Restaurants = () => {
  const { id } = useParams()
  const initialRestaurantState = {
    id: null,
    name: "",
    address: {},
    cuisine: "",
    reviews: [],
  }
  const [restaurant, setRestaurant] = useState(initialRestaurantState)

  const getRestaurant = id => {
    RestaurantDataService.get(id)
      .then(response => {
        setRestaurant(response.data)
        console.log(response.data)
      })
      .catch(e => {
        console.log(e)
      })
  }
  const deleteReview = (reviewId, reviewUser, index) => {
    RestaurantDataService.deleteReview(reviewId, reviewUser)
      .then(response => {
        setRestaurant(prevState => {
          prevState.reviews.splice(index, 1) // Remove review from array
          return { ...prevState }
        })
        console.log("Review deleted successfully!")
      })
      .catch(e => {
        console.log(e)
      })
  }

  useEffect(() => {
    getRestaurant(id)
  }, [id])

  return (
    <div className="mt-5">
      {restaurant ? (
        <div>
          <h3>{restaurant.name}</h3>
          <hr />
          <p>
            <strong>Cuisine: </strong>
            {restaurant.cuisine}
            <br />
            <strong>Address: </strong>
            {restaurant.address.building} {restaurant.address.street},{" "}
            {restaurant.address.zipcode}
          </p>

          <Link
            to={"/restaurants/" + id + "/review"}
            className="btn btn-primary"
          >
            Add Review
          </Link>
          <hr />
          <h4 className="mt-5"> Reviews </h4>
          <div className="row">
            {restaurant.reviews.length > 0 ? (
              restaurant.reviews.map((review, index) => {
                return (
                  <div className="col-lg-4 pb-1" key={index}>
                    <div className="card">
                      <div className="card-body">
                        <p className="card-text">
                          <footer className="blockquote-footer mt-2">
                            <strong>{index + 1}.</strong>
                            <cite title="Source Title">{review.text}</cite>
                          </footer>
                          <hr />
                          <strong>User: </strong>
                          {review.name}
                          <br />
                          <strong>Date: </strong>
                          {review.date}
                          <hr />
                          <div className="row">
                            <div className="col">
                              <button
                                className="bg-white border-0"
                                onClick={() =>
                                  deleteReview(
                                    review._id,
                                    review.user_id,
                                    index
                                  )
                                }
                              >
                                <MdDeleteOutline className="text-danger h1" />
                              </button>
                            </div>
                            <div className="col">
                              <button className="bg-white border-0">
                                <MdModeEdit className="text-warning h1" />
                              </button>
                            </div>
                          </div>
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="col-sm-4">
                <p>No reviews yet.</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Restaurant...</p>
        </div>
      )}
    </div>
  )
}

export default Restaurants
