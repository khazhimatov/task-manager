import axios, { AxiosInstance } from 'axios'
import config from '../config'

const request: AxiosInstance = axios.create({
  baseURL: config.get('apiBaseURL'),
})

export { request }
