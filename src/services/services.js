import http from "../http-common.js"

class RestaurantDataService {
  getAll(page = 0) {
    return http.get(`?page=${page}`)
  }
  find(query, by, page = 0) {
    return http.get(`?${by}=${query}&page=${page}`)
  }
  get(id) {
    return http.get(`/id/${id}`)
  }
  createReview(data) {
    return http.post("/review", data)
  }
  deleteReview(id, userId) {
    return http.delete(`/review?id=${id}`, { data: { user_id: userId } })
  }
}

export default new RestaurantDataService()
