import axios from 'axios'

const API_URL = 'http://localhost:5000/api/items'

const api = {
  // Get all items
  getItems: () => {
    return axios.get(API_URL)
  },
  
  // Get a single item by ID
  getItemById: (id) => {
    return axios.get(`${API_URL}/${id}`)
  },
  
  // Create a new item
  createItem: (itemData) => {
    return axios.post(API_URL, itemData)
  },
  
  // Update an item
  updateItem: (id, itemData) => {
    return axios.put(`${API_URL}/${id}`, itemData)
  },
  
  // Delete an item
  deleteItem: (id) => {
    return axios.delete(`${API_URL}/${id}`)
  }
}

export default api