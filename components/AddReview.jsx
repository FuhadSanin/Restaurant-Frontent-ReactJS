import React, { useState } from "react"
import { Link, useParams } from "react-router-dom"
import RestaurantDataService from "../src/services/services.js"

const AddReview = () => {
  const [submitted, setSubmitted] = useState(false)
  const [review, setReview] = useState("")
  const [name, setName] = useState("")
  const [user_id, setId] = useState("")
  const { id } = useParams()

  const saveReview = e => {
    e.preventDefault()
    var date = {
      name: name,
      text: review,
      restaurant_id: id,
      user_id: user_id,
    }
    RestaurantDataService.createReview(date)
      .then(response => {
        setSubmitted(true)
        console.log(response.data)
      })
      .catch(e => {
        console.log(e)
      })
  }

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <Link to={"/restaurants/" + id} className="btn btn-success">
            Back to Restaurant
          </Link>
        </div>
      ) : (
        <div>
          <h1 className="mt-5">Add Review</h1>
          <hr />
          <div className="form-group mt-5">
            {/* <label htmlFor="description">
              {editing ? "Edit" : "Create"} Review
            </label> */}
            <input
              type="text"
              className="form-control"
              placeholder="User id"
              id="text"
              required
              name="text"
              value={user_id}
              onChange={e => setId(e.target.value)}
            />
            <input
              type="text"
              className="form-control"
              placeholder="User Name"
              id="text"
              required
              name="text"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <input
              type="text"
              className="form-control"
              placeholder="Enter review"
              id="text"
              required
              name="text"
              value={review}
              onChange={e => setReview(e.target.value)}
            />
          </div>
          <button onClick={saveReview} className="btn btn-success mt-3">
            Submit
          </button>
        </div>
      )}
    </div>
  )
}

export default AddReview
