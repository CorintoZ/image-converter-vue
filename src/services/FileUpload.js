import axios from 'axios'

const apiClient = axios.create({
  baseURL: `http://localhost:3000`,
  withCredentials: false, // This is the default
  headers: {
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'multipart/form-data',
    'Access-Control-Allow-Credentials': false
  }
})

export default {
  upload(formData, cancel) {
    return apiClient.post('/photos/upload', formData, cancel)
  }
}
