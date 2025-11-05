import axios from "axios"
import dotenv from "dotenv"

dotenv.config()
const API_URL = process.env.API_URL

export const getUsers = async () => {
  const response = await axios.get(`${API_URL}/users-to-scrape`)
  return response.data
}

export const sendJobs = async (userId, jobs) => {
  await axios.post(`${API_URL}/jobs/sync`, { userId, jobs })
}
