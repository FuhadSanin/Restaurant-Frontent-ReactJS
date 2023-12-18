import axios from "axios"

export default axios.create({
  baseURL: "https://restaurant-back-cajt.onrender.com",
  headers: {
    "Content-type": "application/json",
  },
})
